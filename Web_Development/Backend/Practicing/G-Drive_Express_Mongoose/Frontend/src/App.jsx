import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DirItemListing from "./Component/DirItemListing";
import { RiFolderAddFill } from "react-icons/ri";
import { FaUpload, FaUser } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import Portal from "./Component/Portal";
import DOMPurify from "dompurify";

  export const BaseUrl=import.meta.env.VITE_BACKEND_BASE_URL;

function App() {
  const [driveContent, setDriveContent] = useState({
    files: [],
    directories: [],
  });
  const [directoryName, setDirectoryName] = useState("");
  const [progress, setProgress] = useState({});
  const [ContextMenu, setContextMenu] = useState({ index: -1, listType: null });
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [renameId, setRenameId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const nav = useNavigate();
  const fileUploadRef = useRef();
  const { dirId } = useParams();

  

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BaseUrl}/directory/${dirId || ""}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.parentDirId === null) setDirectoryName("");
      else setDirectoryName(data.name);
      if (!data.error) {
        setDriveContent(data);
        setIsAuthorized(true);
      }
    } catch (error) {
      console.log("Failed to Fetch....");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BaseUrl}/auth`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.error) setUserDetail(data);
      else setIsAuthorized(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, [dirId]);

  //Rename File
  const handleRenameFile = async () => {
    try {
      const cleanInput=DOMPurify.sanitize(inputValue)
      const res = await fetch(`${BaseUrl}/files/${renameId}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newfilename: cleanInput }),
      });
      const resData = await res.json();
      console.log(resData);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  //Rename Directory
  const handleRenameDir = async () => {
    try {
      const cleanInput=DOMPurify.sanitize(inputValue)
      const res = await fetch(`${BaseUrl}/directory/${renameId}`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newfoldername: cleanInput }),
      });
      const resData = await res.json();
      console.log(resData);
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  //Delete Files
  const handleDeleteFile = async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/files/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      const resData = await response.json();
      fetchData();
      console.log(resData);
    } catch (error) {
      console.log("Cannot Delete!!!");
    }
  };

  //Delete Directory
  const handleDeleteDir = async (folderId) => {
    const response = await fetch(
      `${BaseUrl}/directory/${folderId}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
    const resData = await response.json();
    fetchData();
    console.log(resData);
  };

  //Upload files
  const handleFileUpload = async (e) => {
    try {
      axios.defaults.withCredentials = true;
      const uploadSingleFile = async (file) => {
        const filename = file.name;
        console.log(file.name, file.type);
        const res = await axios.post(
          `${BaseUrl}/files/${dirId || ""}`,
          file,
          {
            headers: {
              "Content-Type": file.type,
              filename: file.name,
            },
            onUploadProgress: (e) => {
              const percent = Math.round((e.loaded * 100) / e.total);
              setProgress((prevState) => ({
                ...prevState,
                [filename]: percent,
              }));
            },
          }
        );

        console.log(res);
      };

      for (const file of e.target.files) {
        const filename = file.name;
        setProgress((prevState) => ({
          ...prevState,
          [filename]: 0,
        }));
      }

      for (const file of e.target.files) {
        await uploadSingleFile(file);
        // await delay(file.type.includes("video") ? 4000 : 2000);
      }

      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      fetchData();
      setProgress({});
    } catch (error) {
      console.log(error);
    }
  };

  //Create Directory
  const handleCreateDir = async (e) => {
    try {
      console.log("Create dir");
      e.preventDefault();
      const cleanInput=DOMPurify.sanitize(inputValue)
      const res = await fetch(`${BaseUrl}/directory/${dirId || ''} `, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foldername: cleanInput }),
      });
      const resData = await res.json();
      fetchData();
      console.log(resData);
    } catch (error) {
      console.log("Directory not created");
    }
  };

  //Logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BaseUrl}/auth/logout`, {
        credentials: "include",
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setUserDetail(null);
      nav("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  //Logout All
  const handleLogoutAll=async()=>{
     try {
      const res = await fetch(`${BaseUrl}/auth/logout-all`, {
        credentials: "include",
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      setUserDetail(null);
      nav("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <div
      className="text-lg font-semibold px-4 py-2 min-h-screen bg-[#F9FAFB]"
      onClick={() => {
        setContextMenu(-1);
        setIsProfileOpen(false);
      }}
    >
      <header className="flex justify-between ">
        <h1 className="text-xl text-[#111827]">
          {directoryName || "Your Drive"}
        </h1>
        <div className="flex gap-4 justify-center items-center mr-6">
          {isAuthorized && (
            <RiFolderAddFill
              size={22}
              cursor="pointer"
              color="blue"
              onClick={() => {
                setIsPortalOpen("createDir");
              }}
            />
          )}
          {isPortalOpen && (
            <Portal
              setIsPortalOpen={setIsPortalOpen}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSubmit={
                isPortalOpen === "createDir"
                  ? handleCreateDir
                  : isPortalOpen === "directory"
                  ? handleRenameDir
                  : handleRenameFile
              }
            />
          )}
          {isAuthorized && <FaUpload
            size={20}
            color="#2563EB"
            cursor="pointer"
            onClick={() => fileUploadRef.current.click()}
          />}
          <input
            type="file"
            name="file"
            multiple
            ref={fileUploadRef}
            onChange={(e) => {
              const arrayOfFiles = Array.from(e.target.files);
              setUploadingFiles(arrayOfFiles);
              handleFileUpload(e);
            }}
            hidden
          />
          <div className="relative z-10">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileOpen(!isProfileOpen);
              }}
            >
              {userDetail ?<img src={userDetail.picture} alt="userPic"  className="w-8 rounded-full cursor-pointer border-solid border-blue-200 border-2"/>:<FaUser size={20} color="#2563EB" cursor="pointer" />}
            </div>
            
            {isProfileOpen &&
              (userDetail === null ? (
                <Link
                  to="/login"
                  className="flex items-center gap-4 absolute top-7  right-0 px-2 text-white rounded-md bg-[#2563EB] hover:bg-[#1a17b0] w-28 cursor-pointer"
                >
                  <MdLogin size={20} cursor="pointer" />
                  Login
                </Link>
              ) : (
                <div className="absolute right-0 top-7 py-2 bg-white rounded-md font-normal whitespace-nowrap space-y-1">
                  <div className="leading-[10px] text-normal px-2">
                    <h4>{userDetail.name}</h4>
                    <p className="text-base font-light">{userDetail.email}</p>
                  </div>
                  <hr className="my-1" />
                  <button
                    className="flex items-center gap-4 px-2 text-white w-full rounded-md bg-[#eb2525] hover:bg-[#b01717]"
                    onClick={handleLogout}
                  >
                    <MdLogout size={20} cursor="pointer" />
                    Logout
                  </button>
                  <button
                    className="flex items-center gap-4 px-2 text-white w-full rounded-md bg-[#eb2525] hover:bg-[#b01717]"
                    onClick={handleLogoutAll}
                  >
                    <MdLogout size={20} cursor="pointer" />
                    Logout All
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* <div className="flex gap-2 text-sm font-normal text-blue-600">
          <Link to="/Login">Login</Link>
          <Link to="/SignUp">SignUp</Link>
        </div> */}
      </header>
      <hr />

      <main>
        {/* {uploadingFiles.map((file) => {
          console.log(file);
          return <div>{file.name}</div>;
        })} */}

        {Object.entries(progress).map(([filename, percent], i) => (
          <div
            className=" border-solid relative border-[#E5E7EB] border-[2px] pl-4 pr-2 pt-1 pb-4 my-2 bg-[#F5F7da] rounded-md font-semibold text-[#374151] text-[16px]  hover:bg-[#F5F7aa] transition-all ease-in-out"
            key={i}
          >
            {filename}
            <div className="text-[12px] text-center   bg-slate-200 h-1 leading-[10px] rounded-lg">
              <p
                className={`rounded-lg   font-semibold bg-blue-500 h-1 `}
                style={{ width: `${percent}%` }}
              ></p>
              {percent}%
            </div>
          </div>
        ))}

        <DirItemListing
          listingItem={driveContent.directories}
          listType="directory"
          isContextMenu={ContextMenu}
          setIsContextMenu={setContextMenu}
          handleDelete={handleDeleteDir}
          setIsPortalOpen={setIsPortalOpen}
          setInputValue={setInputValue}
          setRenameId={setRenameId}
        />
        <DirItemListing
          listingItem={driveContent.files}
          listType="files"
          isContextMenu={ContextMenu}
          setIsContextMenu={setContextMenu}
          handleDelete={handleDeleteFile}
          setIsPortalOpen={setIsPortalOpen}
          setInputValue={setInputValue}
          setRenameId={setRenameId}
        />
      </main>
    </div>
  );
}

export default App;
