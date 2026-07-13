import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { ChevronRight, ChevronLeft } from "lucide-react";

function App() {
  const [inputfield, setInputField] = useState("");
  const [chatData, setChatdata] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  const handleGenerate = async () => {
    try {
      if (inputfield === "") {
        console.log("Please, Enter prompt first");
        return;
      }
      setThinking(true);
      console.log(inputfield);
      setChatdata((prevState) => {
        const temp = [...prevState];
        temp.push({ question: inputfield });
        return temp;
      });
      // update current conversation
      setConversations((prev) => {
        if (activeConvId == null) return prev;
        return prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, { question: inputfield }] }
            : c,
        );
      });
      setInputField("");
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: inputfield }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value);
        setChatdata((prevState) => {
          const temp = [...prevState];
          temp[prevState.length - 1].answer = text;
          return temp;
        });
        // update active conversation answer in parallel
        setConversations((prev) => {
          if (activeConvId == null) return prev;
          return prev.map((c) => {
            if (c.id !== activeConvId) return c;
            const msgs = [...c.messages];
            if (msgs.length === 0)
              msgs.push({ question: inputfield, answer: text });
            else
              msgs[msgs.length - 1] = {
                ...msgs[msgs.length - 1],
                answer: text,
              };
            return { ...c, messages: msgs };
          });
        });
        // auto-scroll as text streams in
        if (bottomRef.current)
          bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setThinking(false);
    }
  };

  // Auto-scroll when chatData changes (e.g., new message appended)
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatData]);

  const newConversation = () => {
    const id = Date.now();
    const conv = { id, title: "New Conversation", messages: [] };
    setConversations((prev) => [conv, ...prev]);
    setActiveConvId(id);
    setChatdata([]);
  };

  const openConversation = (conv) => {
    setActiveConvId(conv.id);
    setChatdata(conv.messages || []);
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
              onClick={newConversation}
              className={`w-full bg-white text-black py-2 rounded mb-3 ${sidebarOpen ? "" : "hidden"}`}
            >
              New Conversation
            </button>
            <div
              className="space-y-2 overflow-y-auto scrollbar-thin"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              {conversations.length === 0 && (
                <p className="text-sm text-neutral-400">No conversations yet</p>
              )}
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-2 rounded cursor-pointer hover:bg-neutral-700 ${conv.id === activeConvId ? "bg-neutral-700" : ""}`}
                  onClick={() => openConversation(conv)}
                >
                  <div className="text-sm font-medium">
                    {conv.title || "Conversation"}
                  </div>
                  <div className="text-xs text-neutral-400 truncate">
                    {conv.messages &&
                    conv.messages[0] &&
                    conv.messages[0].question
                      ? conv.messages[0].question.slice(0, 50)
                      : ""}
                  </div>
                </div>
              ))}
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
          <div className="pb-60 ">
            {chatData.map(({ question, answer }, index) => (
              <div key={index}>
                <p className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit">
                  {question}
                </p>
                {answer && (
                  <div className="max-w-150 bg-neutral-700 rounded-xl div-3 p-2 mr-2">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <p className="text-purple-600 animate-pulse">Thinking...</p>
            )}
            <div ref={bottomRef} />
          </div>

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
                  onClick={handleGenerate}
                >
                  Ask
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
