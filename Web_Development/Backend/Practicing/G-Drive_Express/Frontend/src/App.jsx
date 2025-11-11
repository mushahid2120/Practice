import { useRef } from "react";
import { useEffect, useState } from "react";
import Button from "./button";
import { useParams } from "react-router-dom";

function App() {
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isEdit, setIsEdit] = useState(null);
  const inputref = useRef();
  const renameRef = useRef();
  const dirRef=useRef()
  const {'*':dirPath}=useParams()

  const filePath=dirPath===undefined ?'':`/${dirPath}`
  console.log(filePath)

  const fetchData = async () => {
    // console.log(`http://127.0.0.1:4000/directory${dirPath}`)
    const response = await fetch(`http://127.0.0.1:4000/directory${filePath}`);
    const data = await response.json();
    setFileList(data);
  };

  useEffect(() => {
    fetchData();
  }, [inputref,dirPath]);

  const handleSave = async (file) => {
    try {
    const res = await fetch(`http://127.0.0.1:4000/files${filePath}/${file}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newfilename: `${filePath}/${renameRef.current.value}` }),
    });
    const resData = await res.json();
    setIsEdit(null);
    console.log(resData);
    fetchData();
    } catch (error) {
      console.log(error.message)
      res.send("Rename unSuccefull")
    }
  };

  const handleDelete = async (file) => {
    const response = await fetch(`http://127.0.0.1:4000/files${filePath}/${file}`, {
      method: "DELETE",
    });
    const resData = await response.json();
    fetchData();
    console.log(resData);
  };

  const handleUpload = async (e) => {
    console.log("handling Submit");
    e.preventDefault();
    const fileName = inputref.current.files[0].name;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://127.0.0.1:4000/files${filePath}/${fileName}`);
    xhr.upload.addEventListener("progress", (e) => {
      const progressPer = Math.floor((e.loaded / e.total) * 100);
      console.log(progressPer);
      setProgress(progressPer);
    }); 

    xhr.onload = () => {
      console.log(xhr.responseText);
      fetchData();
    };
    xhr.send(inputref.current.files[0]);
  };

  const handleCreateDir=async(e)=>{
    e.preventDefault()
    const  res=await fetch(`http://localhost:4000/directory${filePath}/${dirRef.current.value}`,{
      method: "POST",
    })
    const resData=await res.json()
    fetchData()
    dirRef.current.value=''
    console.log(resData)
  }

  return (
    <div className="text-lg font-semibold m-2">
      <h1 className="text-xl">This is Google Drive</h1>
      <form className="m-4" onSubmit={handleUpload}>
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

      <form className="m-4" onSubmit={handleCreateDir}>
        <input
          type="text"
          name="dir"
          id="dir"
          className=" outline-slate-400 px-1 border-solid border-2 boder-slate-300"
          ref={dirRef} 
          required
        />{' '}
        <button className=" mt-4 px-4 rounded-lg bg-blue-600 text-white ">
           create Folder
        </button>
      </form>
      
      {fileList.map(({ name: file, isDirectory }, index) =>
        isEdit === index ? (
          <div key={index}>
            <input
              type="text"
              defaultValue={file}
              ref={renameRef}
              className=" outline-slate-400 px-1 border-solid border-2 boder-slate-300"
            />
            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-blue-500 text-white"
              onClick={() => {
                handleSave(file);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div key={index}>
            {file}{" "}
            <a
              href={
                isDirectory === true
                  ? `${filePath}/${file}`
                  : `http://127.0.0.1:4000/files${filePath}/${file}?action=open`
              }
              className="text-blue-600"
            >
              {" "}
              Open{" "}
            </a>
            {!isDirectory && (
              <a
                href={`http://127.0.0.1:4000/files${filePath}/${file}?action=download`}
                className="text-red-400"
              >
                {" "}
                Download
              </a>
            )}
            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-green-400 text-white"
              onClick={() => {
                setIsEdit(index);
              }}
            >
              Edit
            </button>
            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-red-600 text-white "
              onClick={() => {
                handleDelete(file);
              }}
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;
