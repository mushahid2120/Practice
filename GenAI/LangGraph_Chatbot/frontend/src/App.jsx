import { useState } from "react";
import "./App.css";
import ReactMarkdown from 'react-markdown';



function App() {
  const [inputfield, setInputField] = useState("");
  const [chatData, setChatdata] = useState([]);
  const [thinking, setThinking] = useState(false);

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
      setInputField("");
      const response = await fetch("http://127.0.0.1:8000/generate", {
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
        console.log(text);
        setChatdata((prevState) => {
          const temp = [...prevState];
          temp[prevState.length - 1].answer = text
          return temp;
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setThinking(false);
    }
  };

  return (
    <main className="bg-neutral-900 text-white overflow-x-hidden">
      <div
        className="container min-h-screen  bg-neutral-900 mx-auto max-w-3xl  px-2"
        id="chat-container"
      >
        <div className="pb-60">
          {chatData.map(({ question, answer }, index) => (
            <div key={index}>
              <p className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit">
                {question}
              </p>
              {answer && (
                <p className="max-w-150 bg-neutral-700 rounded-xl p-3">
                  <ReactMarkdown>{answer}</ReactMarkdown>
                </p>
              )}
            </div>
          ))}
          {thinking && (
            <p className="text-purple-600 animate-pulse">Thinking...</p>
          )}
        </div>

        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center bg-neutral-900">
          <div className="bg-neutral-800 p-2 rounded-3xl w-full max-w-3xl mb-3">
            <textarea
              className="w-full resize-none outline-0 p-3"
              rows="2"
              id="input"
              value={inputfield}
              onChange={(e) => {
                setInputField(e.target.value);
              }}
              onKeyDown={(e)=>{
                if (e.key === 'Enter')
                    handleGenerate()
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
    </main>
  );
}

export default App;
