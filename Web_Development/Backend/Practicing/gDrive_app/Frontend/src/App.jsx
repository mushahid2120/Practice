import { useRef } from "react";
import { useEffect, useState } from "react";
import Button from "./button";

function App() {
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isEdit,setIsEdit]=useState(null)
  const inputref = useRef();
  const renameRef=useRef();

  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:4000");
    const data = await response.json();
    setFileList(data);
  };

  useEffect(() => {
    fetchData();
  }, [inputref]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:4000");
    xhr.setRequestHeader("filename", inputref.current.files[0].name);
    // xhr.send('Ellow ')
    xhr.upload.addEventListener("progress", (e) => {
      const progressPer = Math.floor((e.loaded / e.total) * 100);
      setProgress(progressPer);
    });

    xhr.onload = () => {
      console.log(xhr.responseText);
      fetchData();
    };
    xhr.send(inputref.current.files[0]);
  };


  return (
    <div className="text-lg font-semibold m-2">
      <h1 className="text-xl">This is Google Drive</h1>
      <form className="m-4" onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="file"
          ref={inputref}
          onChange={() => {
            setProgress(0);
          }}
        />
        <span id="progress-bar" className="font-normal text-base">
          progress: {progress}%
        </span>
        <br />
        <button className=" mt-4 px-4 rounded-lg bg-blue-600 text-white ">
          Submit
        </button>
      </form>
      {fileList.map((file, index) => (
        isEdit===index ?(
          <div key={index}>
            <input type="text" defaultValue={file} ref={renameRef} className=" outline-slate-400 px-1 border-solid border-2 boder-slate-300"/>
            <button className=" mt-2 mx-2 px-2 rounded-lg bg-blue-500 text-white"
            onClick={async(e)=>{
                const res=await fetch('http://127.0.0.1:4000',{
                  method:'PUT',
                  headers: {
                    oldname: file,
                    newname: renameRef.current.value
                  }
                })
                const resData=await res.json()
                setIsEdit(null)
                setFileList(resData)

            }}>Save</button>
          </div>
        ):(
          <div key={index}>
          {file}{" "}
          <a
            href={`http://127.0.0.1:4000/${file}?action=open`}
            className="text-blue-600"
          >
            {" "}
            Open{" "}
          </a>
          <a
            href={`http://127.0.0.1:4000/${file}?action=download`}
            className="text-red-400"
          >
            {" "}
            Download
          </a>
          <button className=" mt-2 mx-2 px-2 rounded-lg bg-green-400 text-white"
            onClick={()=>{
              setIsEdit(index)
            }}
          >
            Edit
          </button>
          <button className=" mt-2 mx-2 px-2 rounded-lg bg-red-600 text-white "
            onClick={async()=>{
              const response=await fetch('http://127.0.0.1:4000',{
                method: 'DELETE',
                headers:{
                  filename: file
                }
              })
              const resData=await response.json()
              setFileList(resData)
              
            }}
          >
            Delete
          </button>
        </div>
        )
      ))}
    </div>
  );
}

export default App;
