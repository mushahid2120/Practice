import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DirItemListing from "./Component/DirItemListing";

import Portal from "./Component/Portal";
import DOMPurify from "dompurify";

export const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

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
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const inputRef = useRef();
  const nav = useNavigate();
  const fileUploadRef = useRef();
  const { dirId } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${BaseUrl}/directory/${dirId || ""}`, {
        credentials: "include",
      });
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
      const cleanInput = DOMPurify.sanitize(inputValue);
      const res = await fetch(`${BaseUrl}/files/${selectedItemId}`, {
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
      const cleanInput = DOMPurify.sanitize(inputValue);
      const res = await fetch(`${BaseUrl}/directory/${selectedItemId}`, {
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
      const response = await fetch(`${BaseUrl}/files/${selectedItemId}`, {
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
    const response = await fetch(`${BaseUrl}/directory/${selectedItemId}`, {
      credentials: "include",
      method: "DELETE",
    });
    const resData = await response.json();
    fetchData();
    console.log(resData);
  };

  //Upload files
  const handleFileUpload = async (e) => {
    axios.defaults.withCredentials = true;
    const uploadSingleFile = async (file) => {
      const controller = new AbortController();

      const filename = file.name;
      setProgress((prevState) => ({
        ...prevState,
        [filename]: { dataTransfer: 0, controller },
      }));

      console.log(file.name, file.type);
      try {
        const res = await axios.post(`${BaseUrl}/files/${dirId || ""}`, file, {
          signal: controller.signal,
          headers: {
            "Content-Type": file.type,
            filename: file.name,
            filesize: file.size,
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress((prevState) => ({
              ...prevState,
              [filename]: { ...prevState[filename], dataTransfer: percent },
            }));
          },
        });

        console.log(res);
      } catch (error) {
        console.log(error);
        if (error.code === "ERR_CANCELED") {
          console.log("Upload Cancled");
          setProgress((prevState) => {
            delete prevState[filename];
            return prevState;
          });
        }
      }
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
    }

    fetchData();
    setProgress({});
  };

  //Create Directory
  const handleCreateDir = async (e) => {
    try {
      console.log("Create dir");
      e.preventDefault();
      const cleanInput = DOMPurify.sanitize(inputValue);
      const res = await fetch(`${BaseUrl}/directory/${dirId || ""} `, {
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
  const handleLogoutAll = async () => {
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
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
      onClick={() => {
        setContextMenu(-1);
        setIsProfileOpen(false);
      }}
    >
      {/* Modern Header with Glassmorphism Effect */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left: Title with Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {directoryName || "Your Drive"}
              </h1>
            </div>

            {/* Right: Action Buttons & Profile */}
            <div className="flex gap-3 items-center">
              {isAuthorized && (
                <>
                  {/* Create Folder Button */}
                  <button
                    onClick={() =>
                      setIsPortalOpen({
                        header: "Create Directory",
                        submitBtn: "Create",
                      })
                    }
                    className="group relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z" />
                    </svg>
                    <span className="hidden sm:inline">New Folder</span>
                  </button>

                  {/* Upload Button */}
                  <button
                    onClick={() => fileUploadRef?.current?.click()}
                    className="group relative px-4 py-2.5 rounded-xl bg-white border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50 hover:scale-105 transition-all duration-200 flex items-center gap-2 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </>
              )}

              <input
                type="file"
                name="file"
                multiple
                ref={fileUploadRef}
                onChange={(e) => {
                  const arrayOfFiles = Array.from(e.target.files || []);
                  setUploadingFiles(arrayOfFiles);
                  handleFileUpload(e);
                }}
                hidden
              />

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="group"
                >
                  {userDetail ? (
                    <div className="relative">
                      <img
                        src={userDetail.picture}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-md">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {userDetail === null ? (
                      <div>
                        <Link
                          to="/login"
                          className="flex items-center gap-3 m-2 rounded-xl px-4 py-2 text-blue-500 hover:bg-[#dfe2e7] hover:text-blue-600 transition-all duration-200"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
                          </svg>
                          <span className="font-semibold">Log In</span>
                        </Link>
                        <Link
                          to="/login"
                          className="flex items-center rounded-xl m-2  gap-3 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
                          </svg>
                          <span className="font-semibold">Register</span>
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* User Info */}
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <h4 className="font-semibold text-gray-800 text-lg">
                            {userDetail.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {userDetail.email}
                          </p>
                        </div>

                        <div className="p-2 space-y-1">
                          {/* Logout Button */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                              <svg
                                className="w-5 h-5 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                              </svg>
                            </div>
                            <span className="font-medium">Log Out</span>
                          </button>

                          {/* Logout All Button */}
                          <button
                            onClick={handleLogoutAll}
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                              <svg
                                className="w-5 h-5 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                              </svg>
                            </div>
                            <span className="font-medium">
                              Log Out All Devices
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Portal */}
      {isPortalOpen && (
        <Portal
          setIsPortalOpen={setIsPortalOpen}
          isPortalOpen={isPortalOpen}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputRef={inputRef}
          handleSubmit={
            isPortalOpen.header === "Create Directory"
              ? handleCreateDir
              : isPortalOpen.header === "Rename directory"
              ? handleRenameDir
              : isPortalOpen.header === "Rename files"
              ? handleRenameFile
              : isPortalOpen.header === "Delete directory"
              ? handleDeleteDir
              : handleDeleteFile
          }
        >
          <div>
            <label
              htmlFor="rename-input"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Name
            </label>
            <input
              type="text"
              name="input"
              id="rename-input"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 text-gray-800 font-medium"
              placeholder="Enter new name..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              ref={inputRef}
              required
            />
          </div>
        </Portal>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Progress Section */}
        {Object.entries(progress).length > 0 && (
          <div className="mb-8 space-y-3">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
              Uploading Files
            </h2>
            {Object.entries(progress).map(
              ([filename, { controller, dataTransfer }], i) => {
                console.log(filename, controller, dataTransfer);
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800 truncate">
                          {filename}
                        </span>
                      </div>
                      {controller && (
                        <button
                          className="p-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600  flex items-center justify-center transition-colors"
                          onClick={() => {
                            if (controller) {
                              controller.abort();
                            }
                          }}
                        >
                          Cancle Upload
                        </button>
                      )}
                    </div>
                    {/* Progress Bar */}
                    <div className="relative h-2 bg-gray-100 rounded-full">
                      <div
                        className="absolute  inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${dataTransfer}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-blue-600 ml-4 text-center">
                      {dataTransfer || 0}%
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

        {userDetail !== null ? (
          <>
            {driveContent?.directories && (
              <DirItemListing
                listingItem={driveContent.directories}
                listType="directory"
                isContextMenu={ContextMenu}
                setIsContextMenu={setContextMenu}
                setIsPortalOpen={setIsPortalOpen}
                setInputValue={setInputValue}
                setSelectedItemId={setSelectedItemId}
              />
            )}

            {driveContent?.files && (
              <DirItemListing
                listingItem={driveContent.files}
                listType="files"
                isContextMenu={ContextMenu}
                setIsContextMenu={setContextMenu}
                setIsPortalOpen={setIsPortalOpen}
                setInputValue={setInputValue}
                setSelectedItemId={setSelectedItemId}
              />
            )}
          </>
        ) : (
          <div className="flex justify-center my-16 font-semibold text-blue-500 text-2xl">
            Start Storing your stuff after Login or Register.....
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// (
//   <div
//     className="text-lg font-semibold px-4 py-2 min-h-screen bg-[#F9FAFB]"
//     onClick={() => {
//       setContextMenu(-1);
//       setIsProfileOpen(false);
//     }}
//   >
//     <header className="flex justify-between ">
//       <h1 className="text-xl text-[#111827]">
//         {directoryName || "Your Drive"}
//       </h1>
//       <div className="flex gap-4 justify-center items-center mr-6">
//         {isAuthorized && (
//           <RiFolderAddFill
//             size={22}
//             cursor="pointer"
//             color="blue"
//             onClick={() => {
//               setIsPortalOpen("createDir");
//             }}
//           />
//         )}
//         {isPortalOpen && (
//           <Portal
//             setIsPortalOpen={setIsPortalOpen}
//             inputValue={inputValue}
//             setInputValue={setInputValue}
//             handleSubmit={
//               isPortalOpen === "createDir"
//                 ? handleCreateDir
//                 : isPortalOpen === "directory"
//                 ? handleRenameDir
//                 : handleRenameFile
//             }
//           />
//         )}
//         {isAuthorized && <FaUpload
//           size={20}
//           color="#2563EB"
//           cursor="pointer"
//           onClick={() => fileUploadRef.current.click()}
//         />}
//         <input
//           type="file"
//           name="file"
//           multiple
//           ref={fileUploadRef}
//           onChange={(e) => {
//             const arrayOfFiles = Array.from(e.target.files);
//             setUploadingFiles(arrayOfFiles);
//             handleFileUpload(e);
//           }}
//           hidden
//         />
//         <div className="relative z-10">
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsProfileOpen(!isProfileOpen);
//             }}
//           >
//             {userDetail ?<img src={userDetail.picture} alt="userPic"  className="w-8 rounded-full cursor-pointer border-solid border-blue-200 border-2"/>:<FaUser size={20} color="#2563EB" cursor="pointer" />}
//           </div>

//           {isProfileOpen &&
//             (userDetail === null ? (
//               <Link
//                 to="/login"
//                 className="flex items-center gap-4 absolute top-7  right-0 px-2 text-white rounded-md bg-[#2563EB] hover:bg-[#1a17b0] w-28 cursor-pointer"
//               >
//                 <MdLogin size={20} cursor="pointer" />
//                 Login
//               </Link>
//             ) : (
//               <div className="absolute right-0 top-7 py-2 bg-white rounded-md font-normal whitespace-nowrap space-y-1">
//                 <div className="leading-[10px] text-normal px-2">
//                   <h4>{userDetail.name}</h4>
//                   <p className="text-base font-light">{userDetail.email}</p>
//                 </div>
//                 <hr className="my-1" />
//                 <button
//                   className="flex items-center gap-4 px-2 text-white w-full rounded-md bg-[#eb2525] hover:bg-[#b01717]"
//                   onClick={handleLogout}
//                 >
//                   <MdLogout size={20} cursor="pointer" />
//                   Logout
//                 </button>
//                 <button
//                   className="flex items-center gap-4 px-2 text-white w-full rounded-md bg-[#eb2525] hover:bg-[#b01717]"
//                   onClick={handleLogoutAll}
//                 >
//                   <MdLogout size={20} cursor="pointer" />
//                   Logout All
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* <div className="flex gap-2 text-sm font-normal text-blue-600">
//         <Link to="/Login">Login</Link>
//         <Link to="/SignUp">SignUp</Link>
//       </div> */}
//     </header>
//     <hr />

//     <main>
//       {/* {uploadingFiles.map((file) => {
//         console.log(file);
//         return <div>{file.name}</div>;
//       })} */}

//       {Object.entries(progress).map(([filename, percent], i) => (
//         <div
//           className=" border-solid relative border-[#E5E7EB] border-[2px] pl-4 pr-2 pt-1 pb-4 my-2 bg-[#F5F7da] rounded-md font-semibold text-[#374151] text-[16px]  hover:bg-[#F5F7aa] transition-all ease-in-out"
//           key={i}
//         >
//           {filename}
//           <div className="text-[12px] text-center   bg-slate-200 h-1 leading-[10px] rounded-lg">
//             <p
//               className={`rounded-lg   font-semibold bg-blue-500 h-1 `}
//               style={{ width: `${percent}%` }}
//             ></p>
//             {percent}%
//           </div>
//         </div>
//       ))}

//       <DirItemListing
//         listingItem={driveContent.directories}
//         listType="directory"
//         isContextMenu={ContextMenu}
//         setIsContextMenu={setContextMenu}
//         handleDelete={handleDeleteDir}
//         setIsPortalOpen={setIsPortalOpen}
//         setInputValue={setInputValue}
//         setRenameId={setRenameId}
//       />
//       <DirItemListing
//         listingItem={driveContent.files}
//         listType="files"
//         isContextMenu={ContextMenu}
//         setIsContextMenu={setContextMenu}
//         handleDelete={handleDeleteFile}
//         setIsPortalOpen={setIsPortalOpen}
//         setInputValue={setInputValue}
//         setRenameId={setRenameId}
//       />
//     </main>
//   </div>
// );
