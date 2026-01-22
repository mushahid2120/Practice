import { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DirItemListing from "./Component/DirItemListing";

import Portal from "./Component/Portal";
import DOMPurify from "dompurify";
import Breadcrumb from "./Component/BreadCrumb";
import ToastPopup from "./Component/ToastPopup";
import Header from "./Component/Header";
import UploadProgress from "./Component/UploadProgress";
import ShimmerLoading from "./Component/ShimmerLoading";

export const BaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {
  const [driveContent, setDriveContent] = useState({
    files: [],
    directories: [],
  });

  const [progress, setProgress] = useState({});
  const [ContextMenu, setContextMenu] = useState({ index: -1, listType: null });
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [netErr, setNetErr] = useState("");

  const inputRef = useRef();
  const nav = useNavigate();
  const fileUploadRef = useRef();
  const { dirId } = useParams();

  //fetch files and directories
  const fetchData = async () => {
    try {
      const response = await fetch(`${BaseUrl}/directory/${dirId || ""}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.error) {
        setDriveContent(data);
        setIsAuthorized(true);
      } else setNetErr(resData.error);
    } catch (error) {
      console.log("Failed to Fetch....");
      setNetErr("Server down please try after some time");
    }
  };

  //fetch user Detail
  const fetchUser = async () => {
    try {
      const response = await fetch(`${BaseUrl}/auth`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.error) {
        setUserDetail(data);
      } else {
        setIsAuthorized(false);
        nav("/hero");
      }
    } catch (error) {
      console.log(error);
      setNetErr("server down unable to fetch user data");
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
      if (resData.error) setNetErr(resData.error);
      fetchData();
    } catch (error) {
      console.log(error.message);
      setNetErr("Could not rename file");
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
      if (resData.error) setNetErr(resData.error);
    } catch (error) {
      console.log(error.message);
      setNetErr("Cloud not rename dir");
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
    if (resData.error) setNetErr(resData.error);
  };

  //Upload files
  const handleFileUpload = async (e) => {
    //initiated
    const uploadInit = async (file) => {
      axios.defaults.withCredentials = true;
      const filename = file.name;
      try {
        const res = await axios.post(
          `${BaseUrl}/files/init/${dirId || ""}`,
          {
            filename: file.name,
            filesize: file.size,
            filetype: file.type,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log({ res });
        if (res.status !== 200) console.log(res);
        return res.data;
      } catch (error) {
        console.log(error.response.data.error);
        setNetErr(error.response.data.error);
        console.log(error);
      }
    };

    //upload begin
    const uploadSingleFile = async (uploadUrl, file) => {
      const controller = new AbortController();
      const filename = file.name;

      try {
        const res = await axios.put(uploadUrl, file, {
          signal: controller.signal,
          headers: {
            "Content-Type": file.type,
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

    const uploadComplete = async (fileId, file) => {
      const res = await axios.put(
        `${BaseUrl}/files/complete/${fileId}`,
        { filesize: file.size },
        { headers: { "Content-Type": "application/json" } }
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
      try {
        const uploadRes = await uploadInit(file);
        if (!uploadRes.url) return;
        console.log("bypasssing");
        await uploadSingleFile(uploadRes.url, file);
        await uploadComplete(uploadRes.fileId, file);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    setProgress({});
  };

  //Create Directory
  const handleCreateDir = async (e) => {
    try {
      e.preventDefault();
      const cleanInput = DOMPurify.sanitize(inputValue);
      const res = await fetch(`${BaseUrl}/directory/${dirId || ""} `, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foldername: cleanInput }),
      });
      const resData = await res.json();
      if (resData.error) setNetErr(resData.error);
      fetchData();
    } catch (error) {
      console.log("Directory not created");
      setNetErr("Cloud not create directory");
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
      if (data.error) return setNetErr(data.error);
      nav("/login");
    } catch (error) {
      console.log(error.message);
      setNetErr("Could not Logout");
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
      if (resData.error) setNetErr(resData.error);
      nav("/login");
    } catch (error) {
      console.log(error.message);
      setNetErr("Could not logout from all device");
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
      {/* Header*/}
      <Header
        isAuthorized={isAuthorized}
        setIsPortalOpen={setIsPortalOpen}
        fileUploadRef={fileUploadRef}
        setUploadingFiles={setUploadingFiles}
        handleFileUpload={handleFileUpload}
        setIsProfileOpen={setIsProfileOpen}
        isProfileOpen={isProfileOpen}
        userDetail={userDetail}
        handleLogout={handleLogout}
        handleLogoutAll={handleLogoutAll}
        showProfileIcon={true}
      />

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

      <ToastPopup netErr={netErr} setNetErr={setNetErr} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pt-1 pb-4">
        {/* Upload Progress Section */}
        {Object.entries(progress).length > 0 && (
          <UploadProgress progress={progress} />
        )}

        {userDetail !== null  && isAuthorized ? (
          <>
            <Breadcrumb path={driveContent.path} />
            {driveContent?.directories && (
              <DirItemListing
                listingItem={driveContent.directories}
                path={driveContent.path}
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
                path={driveContent.path}
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
          <ShimmerLoading />
        )}
      </main>
    </div>
  );
}

export default App;
