import { useRef } from "react";
import { useEffect, useState } from "react";
import Button from "./button";
import { Link, useParams } from "react-router-dom";

function App() {
  const [fileList, setFileList] = useState([]);
  const [directoryList,setDirectoryList]=useState([])
  const [progress, setProgress] = useState(0);
  const [isEdit, setIsEdit] = useState(null);
  const [isEditDir,setIsEditDir]=useState(null)
  const inputref = useRef();
  const renameRef = useRef();
  const renameDirRef=useRef()
  const dirRef=useRef()
  const {dirId}=useParams()
  
    // console.log(dirId)

  const fetchData = async () => {
    // console.log(`http://127.0.0.1:4000/directory${dirPath}`)
    const response = await fetch(`http://127.0.0.1:4000/directory/${dirId || ''}`);
    const data = await response.json();
    setFileList(data.files);
    setDirectoryList(data.directories)

  };


  useEffect(() => {
    fetchData();
  }, [inputref,dirId]);

  const handleSave = async (id) => {
    try {
    const res = await fetch(`http://127.0.0.1:4000/files/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newfilename: renameRef.current.value }),
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

  const handleSaveDir=async(folderId)=>{
       try {
    const res = await fetch(`http://127.0.0.1:4000/directory/${folderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newfoldername: renameDirRef.current.value }),
    });
    const resData = await res.json();
    setIsEditDir(null);
    console.log(resData);
    fetchData();
    } catch (error) {
      console.log(error.message)
      res.send("Rename unSuccefull")
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:4000/files/${id}`, {
      method: "DELETE",
    });
    const resData = await response.json();
    fetchData();
    console.log(resData);
  };

  const handleDeleteDir=async(folderId)=>{
     const response = await fetch(`http://127.0.0.1:4000/directory/${folderId}`, {
      method: "DELETE",
    });
    const resData = await response.json();
    fetchData();
    console.log(resData);
  }

  const handleUpload = async (e) => {
    console.log("handling Submit");
    e.preventDefault();
    const fileName = inputref.current.files[0].name;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://127.0.0.1:4000/files/${dirId}`);
    xhr.setRequestHeader('filename',fileName)
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
    const  res=await fetch(`http://localhost:4000/directory/${dirId}`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({foldername: dirRef.current.value})
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
      
      {directoryList.map(({ name:folder,id }, index) =>
        isEditDir === index ? (
          <div key={index}>
            <input
              type="text"
              defaultValue={folder}
              ref={renameDirRef}
              className=" outline-slate-400 px-1 border-solid border-2 boder-slate-300"
            />
            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-blue-500 text-white"
              onClick={() => {
                handleSaveDir(id);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div key={index}>
            {folder}{" "}
            <Link
              to={`/directory/${id}`
              }
              className="text-blue-600"
            >
              {" "}
              Open{" "}
            </Link>

            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-green-400 text-white"
              onClick={() => {
                setIsEditDir(index);
              }}
            >
              Edit
            </button>
            <button
              className=" mt-2 mx-2 px-2 rounded-lg bg-red-600 text-white "
              onClick={() => {
                handleDeleteDir(id);
              }}
            >
              Delete
            </button>
          </div>
        )
      )}

      { fileList.map(({ name:file,id }, index) =>
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
                handleSave(id);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div key={index}>
            {file}{" "}
            <a
              href={`http://127.0.0.1:4000/files/${id}`
              }
              className="text-blue-600"
            >
              {" "}
              Open{" "}
            </a>
              <a
                href={`http://127.0.0.1:4000/files/${id}?action=download`}
                className="text-red-400"
              >
                {" "}
                Download
              </a>

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
                handleDelete(id);
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
