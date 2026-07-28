import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Trash2 } from "lucide-react";

function App() {
  const [inputfield, setInputField] = useState("");
  const [chatData, setChatdata] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [activeConvId, setActiveConvId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [threadIdList, setThreadIdList] = useState([]);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { thread_id: threadId } = useParams();
  const [fetchingController, setFetchingController] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [approvalDialog, setApprovalDialog] = useState(null);

  useEffect(() => {
    getAllThreadId();
  }, []);

  useEffect(() => {
    if (activeConvId == threadId) return;
    if (fetchingController) fetchingController.abort();
    const controller = new AbortController();
    const { signal } = controller;
    setFetchingController(controller);
    setActiveConvId(threadId);
    setChatdata([]);
    if (threadId) getConversation(threadId, signal);
  }, [threadId]);

  console.log(threadId, activeConvId);

  const getConversation = async (thread_id, signal) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get-chat-by-thread-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ thread_id }),
          signal: signal,
        },
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete JSON
        for (const line of lines) {
          if (!line.trim()) continue;
          setChatdata((prev) => [...prev, JSON.parse(line)]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllThreadId = async () => {
    try {
      const response = await fetch("http://localhost:8000/all-thread");
      const data = await response.json();
      console.log(data);
      if (data.thread_id_list.length !== 0) {
        setThreadIdList(data.thread_id_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopGenerating = async () => {
    if (!isGenerating) return;
    try {
      const response = await fetch(`http://localhost:8000/stop/${threadId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.success)
        setChatdata((prev) => {
          let temp = [...prev];
          temp.pop();
          return temp;
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    try {
      if (inputfield === "") {
        console.log("Please, Enter prompt first");
        return;
      }
      setThinking(true);
      setIsGenerating(true);
      setChatdata((prevState) => {
        const temp = [...prevState];
        temp.push({ question: inputfield });
        return temp;
      });
      // console.log(chatData);
      setThinking(true);
      setInputField("");
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: inputfield, thread_id: activeConvId }),
      });
      const thread_id = response.headers.get("X-Thread-ID");
      if (!activeConvId && thread_id) {
        setActiveConvId(thread_id);
        navigate(`/${thread_id}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Each SSE message ends with \n\n
        const events = buffer.split("\n\n");

        // Keep the incomplete event in the buffer
        buffer = events.pop() || "";

        for (const rawEvent of events) {
          if (!rawEvent.trim()) continue;

          let eventName = "";
          let data = "";

          for (const line of rawEvent.split("\n")) {
            if (line.startsWith("event:")) {
              eventName = line.substring(6).trim();
            }

            if (line.startsWith("data:")) {
              data = line.substring(5).trim();
            }
          }

          const payload = JSON.parse(data);

          switch (eventName) {
            case "text":
              answer += payload.content;

              setChatdata((prev) => {
                const temp = [...prev];
                temp[temp.length - 1].answer = answer;
                return temp;
              });

              if (bottomRef.current) {
                bottomRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }
              break;

            case "approval":
              console.log("Approval Required", payload);

              setApprovalDialog(payload);
              break;

            case "done":
              console.log("Generation completed");
              break;
          }
        }
      }
      setIsGenerating(false);
    } catch (error) {
      setThinking(false);
      setIsGenerating(false);
      console.log(error);
    }
  };

  async function approve(approved) {
    try {
      setApprovalDialog(null);
      setThinking(true);
      setIsGenerating(true);
      const response = await fetch("http://localhost:8000/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: activeConvId,
          approved,
        }),
      });
      setThinking(false);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Each SSE message ends with \n\n
        const events = buffer.split("\n\n");

        // Keep the incomplete event in the buffer
        buffer = events.pop() || "";

        for (const rawEvent of events) {
          if (!rawEvent.trim()) continue;

          let eventName = "";
          let data = "";

          for (const line of rawEvent.split("\n")) {
            if (line.startsWith("event:")) {
              eventName = line.substring(6).trim();
            }

            if (line.startsWith("data:")) {
              data = line.substring(5).trim();
            }
          }

          const payload = JSON.parse(data);

          switch (eventName) {
            case "text":
              answer += payload.content;

              setChatdata((prev) => {
                const temp = [...prev];
                temp[temp.length - 1].answer = answer;
                return temp;
              });

              if (bottomRef.current) {
                bottomRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }
              break;

            case "approval":
              console.log("Approval Required", payload);

              setApprovalDialog(payload);
              break;

            case "done":
              console.log("Generation completed");
              break;
          }
        }
      }
      setIsGenerating(false);
    } catch (error) {
      setThinking(false);
      setIsGenerating(false);
      console.log(error);
    }
  }

  const handleDeleteThread = async (thread_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/delete-thread/${thread_id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (data.success) {
        if (thread_id == threadId) navigate("/");
        getAllThreadId();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(chatData);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatData]);

  const openConversation = (thread) => {
    navigate(`/${thread}`);
  };

  return (
    <main className="bg-neutral-900 text-white overflow-hidden h-screen">
      <div className="flex justify-between ">
        {/* Sidebar */}
        <div
          className={`relative z-100 bg-neutral-800 h-screen text-white  shrink-0 transition-all duration-200   ${sidebarOpen ? "lg:w-72 md:w-60 sm:w-56 w-full block" : "w-0 hidden"}`}
        >
          <aside className={`absolute inset-0 top-0  p-3 scrollbar-thin`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Conversations</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-sm px-2 py-1 bg-neutral-700 rounded"
              >
                <ChevronLeft />
              </button>
            </div>
            <button
              onClick={() => {
                setActiveConvId(null);
                navigate("/");
                setChatdata([]);
              }}
              className={`w-full bg-white cursor-pointer text-black py-2 rounded mb-3 ${sidebarOpen ? "" : "hidden"}`}
            >
              New Conversation
            </button>
            <div
              className="space-y-2 overflow-y-auto scrollbar-thin"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              {threadIdList.length === 0 && (
                <p className="text-sm text-neutral-400">No conversations yet</p>
              )}
              {threadIdList.map((thread) => {
                const [thread_id, title] = Object.entries(thread)[0];
                return (
                  <div
                    key={thread_id}
                    className={`flex justify-between items-center p-2 truncate rounded cursor-pointer  hover:bg-neutral-400 ${thread === activeConvId ? "bg-neutral-400" : "bg-neutral-600"} `}
                    onClick={() => openConversation(thread_id)}
                  >
                    <div>{title}</div>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteThread(thread_id);
                      }}
                    >
                      <Trash2 />
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* Chevron open button when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-2 top-10 -translate-y-1/2 z-40 bg-neutral-800 text-white rounded-md p-2"
          >
            <ChevronRight />
          </button>
        )}

        <div
          className=" container px-4 overflow-y-auto h-screen scrollbar-thin"
          id="chat-container"
          ref={containerRef}
        >
          {/* prompt and generated Text */}
          <div>
            {chatData.map(({ question, answer }, index) => (
              <div key={index}>
                <p className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit">
                  {question}
                </p>
                {answer && (
                  <div className=" bg-neutral-700 rounded-xl div-3 p-2 lg:mr-32 md:mr-20 mr-10">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {approvalDialog && (
              <div className="mx-4 my-4 rounded-xl border border-amber-500/30 bg-zinc-900 shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-2 border-b border-zinc-800 bg-amber-500/10 px-4 py-3">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-amber-300">
                      Tool Approval Required
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {approvalDialog.message}
                    </p>
                  </div>
                </div>

                {/* Tool Calls */}
                <div className="space-y-4 p-4">
                  {approvalDialog.tool_calls.map((tool) => (
                    <div
                      key={tool.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-950"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
                        <span className="font-medium text-blue-400">
                          {tool.name}
                        </span>

                        <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                          MCP Tool
                        </span>
                      </div>

                      <pre className="overflow-x-auto p-4 text-sm text-zinc-300">
                        {JSON.stringify(tool.args, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-zinc-800 bg-zinc-900 px-4 py-3">
                  <button
                    onClick={() => approve(false)}
                    className="rounded-lg border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => approve(true)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500"
                  >
                    Approve
                  </button>
                </div>
              </div>
            )}
            {thinking && (
              <p className="text-purple-600 animate-pulse">Thinking...</p>
            )}
            <div ref={bottomRef} className="pb-40" />
          </div>

          {/* Text Box  Input Field*/}
          <div
            className={`fixed  bottom-0 flex items-center justify-center bg-neutral-900`}
            style={{ left: sidebarOpen ? "18rem" : "0", right: 0 }}
          >
            <div className="bg-neutral-800 p-2 rounded-3xl  mb-3 mx-2 w-full lg:w-full md:w-full sm:w-full lg:max-w-4xl md:max-w-2xl sm:max-w-xl  ">
              <textarea
                className="w-full  resize-none outline-0 p-3 bg-neutral-900 text-white rounded-2xl"
                rows="2"
                id="input"
                value={inputfield}
                onChange={(e) => {
                  setInputField(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              ></textarea>
              <div className="flex items-center justify-end">
                <button
                  id="ask"
                  className="bg-white px-4 py-1 text-black rounded-full cursor-pointer hover:bg-gray-300"
                  onClick={() => {
                    if (isGenerating) stopGenerating();
                    else handleGenerate();
                  }}
                >
                  {isGenerating ? "Stop" : "Ask"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
