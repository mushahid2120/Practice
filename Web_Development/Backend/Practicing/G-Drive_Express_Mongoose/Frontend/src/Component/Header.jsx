import React from "react";
import { Link } from "react-router-dom";

function Header({
  isAuthorized,
  setIsPortalOpen,
  fileUploadRef,
  setUploadingFiles,
  handleFileUpload,
  setIsProfileOpen,
  isProfileOpen,
  userDetail,
  handleLogout,
  handleLogoutAll,
  showProfileIcon,
}) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Title with Icon */}
            <Link to={isAuthorized ? "/home": "/"} className="flex items-center gap-3 hover:drop-shadow-xl hover:text-[#292959]">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent ">
                Your Drive
              </h1>
            </Link>

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
              {showProfileIcon && (
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
              )}

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

                      {/* progreass bar of stroge used */}
                      <div className="px-6 py-3 border-t border-gray-200">
                        {/* Progress Bar */}
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div
                            className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-all duration-300"
                            style={{
                              width:
                                (userDetail.usedStorage / userDetail.capacity) *
                                  100 +
                                "%",
                            }}
                          ></div>
                        </div>

                        {/* Storage Info */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>
                            {Math.floor(userDetail.usedStorage / 1024 / 1024)}{" "}
                            MB of{" "}
                            {Math.floor(userDetail.capacity / 1024 / 1024)} MB
                            used
                          </span>
                          <span className="font-semibold text-blue-600">
                            {Math.floor(
                              (userDetail.usedStorage / userDetail.capacity) *
                                100
                            )}
                            %
                          </span>
                        </div>
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
  );
}

export default Header;
