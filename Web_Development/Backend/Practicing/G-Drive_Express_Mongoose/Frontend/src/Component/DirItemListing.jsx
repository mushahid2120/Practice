import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import { BaseUrl } from "../App";

function DirItemListing({
  listingItem = [],
  path,
  listType,
  isContextMenu,
  setIsContextMenu,
  setIsPortalOpen,
  setInputValue,
  setSelectedItemId,
}) {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const viewSize = (itemSize) => {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;
    if (itemSize >= GB) return `${Math.floor(itemSize / GB)} GB`;
    else if (itemSize >= MB) return `${Math.floor(itemSize / MB)} MB`;
    else if (itemSize >= KB) return `${Math.floor(itemSize / KB)} KB`;
    return `${itemSize} Bytes`;
  };

  // Get file extension for icon
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    // Color coding for different file types
    const iconConfig = {
      // Documents
      pdf: { color: "text-red-500", bg: "bg-red-50" },
      doc: { color: "text-blue-500", bg: "bg-blue-50" },
      docx: { color: "text-blue-500", bg: "bg-blue-50" },
      txt: { color: "text-gray-500", bg: "bg-gray-50" },

      // Images
      jpg: { color: "text-purple-500", bg: "bg-purple-50" },
      jpeg: { color: "text-purple-500", bg: "bg-purple-50" },
      png: { color: "text-purple-500", bg: "bg-purple-50" },
      gif: { color: "text-purple-500", bg: "bg-purple-50" },
      svg: { color: "text-purple-500", bg: "bg-purple-50" },

      // Videos
      mp4: { color: "text-pink-500", bg: "bg-pink-50" },
      avi: { color: "text-pink-500", bg: "bg-pink-50" },
      mov: { color: "text-pink-500", bg: "bg-pink-50" },

      // Archives
      zip: { color: "text-yellow-600", bg: "bg-yellow-50" },
      rar: { color: "text-yellow-600", bg: "bg-yellow-50" },

      // Code
      js: { color: "text-yellow-500", bg: "bg-yellow-50" },
      jsx: { color: "text-cyan-500", bg: "bg-cyan-50" },
      py: { color: "text-blue-600", bg: "bg-blue-50" },
      java: { color: "text-orange-500", bg: "bg-orange-50" },
      html: { color: "text-orange-600", bg: "bg-orange-50" },
      css: { color: "text-blue-400", bg: "bg-blue-50" },
    };

    return iconConfig[ext] || { color: "text-gray-500", bg: "bg-gray-50" };
  };

  if ((!listingItem || listingItem.length === 0) && listType === "files") {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-gray-400">
        <svg
          className="w-24 h-24 mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        <p className="text-lg font-medium">
          No {listType === "directory" ? "folders" : "files"} yet
        </p>
        <p className="text-sm mt-1">
          Start by creating a new{" "}
          {listType === "directory" ? "folder" : "uploading files"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Section Header with View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
          {listType === "directory" ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              Folders
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              Files
            </>
          )}
          <span className="text-gray-400 font-normal">
            ({listingItem.length})
          </span>
        </h2>

        {/* View Mode Toggle/// */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              viewMode === "grid"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              viewMode === "list"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {listingItem.map(
            ({ name, _id: id, createdAt, updatedAt, size }, index) => {
              const iconStyle = listType === "files" ? getFileIcon(name) : null;
              return (
                <div
                  key={id}
                  className="group relative bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300  cursor-pointer"
                >
                  <Link
                    to={
                      listType === "directory"
                        ? `/directory/${id}`
                        : `${BaseUrl}/files/${id}`
                    }
                    className="block p-4"
                    title={`size: ${viewSize(size)}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl mb-3 ${
                        listType === "directory"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : iconStyle.bg
                      } flex items-center justify-center shadow-md ${
                        listType === "directory" ? "shadow-blue-500/30" : ""
                      }`}
                    >
                      {listType === "directory" ? (
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      ) : (
                        <svg
                          className={`w-8 h-8 ${iconStyle.color}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                      {name}
                    </h3>
                    {listType === "files" && (
                      <p className="text-xs text-gray-500 uppercase">
                        {name.split(".").pop()} file
                      </p>
                    )}
                  </Link>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 ">
                    {listType === "files" && (
                      <Link
                        to={`${BaseUrl}/files/${id}?action=download`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                      >
                        <FaDownload size={13} className="text-green-600" />
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (
                          isContextMenu.index === -1 ||
                          isContextMenu.index !== index
                        )
                          setIsContextMenu({ index, listType });
                        else setIsContextMenu({ index: -1, listType: null });
                      }}
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <BsThreeDotsVertical
                        size={15}
                        className="text-gray-600"
                      />
                    </button>
                  </div>

                  {/* Context Menu */}
                  <ContextMenu
                    isOpen={
                      isContextMenu.index === index &&
                      isContextMenu.listType === listType
                    }
                    setIsContextMenu={setIsContextMenu}
                    id={id}
                    setIsPortalOpen={setIsPortalOpen}
                    name={name}
                    setInputValue={setInputValue}
                    listType={listType}
                    setSelectedItemId={setSelectedItemId}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    size={viewSize(size)}
                    path={path}
                  />
                </div>
              );
            }
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2">
          {listingItem.map(
            ({ name, _id: id, createdAt, updatedAt, size }, index) => {
              const iconStyle = listType === "files" ? getFileIcon(name) : null;

              return (
                <div
                  key={id}
                  className="group relative bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 "
                >
                  <Link
                    to={
                      listType === "directory"
                        ? `/directory/${id}`
                        : `${BaseUrl}/files/${id}`
                    }
                    title={viewSize(size)}
                    className="flex items-center gap-4 p-4"
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-lg flex-shrink-0 ${
                        listType === "directory"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : iconStyle.bg
                      } flex items-center justify-center shadow-sm ${
                        listType === "directory" ? "shadow-blue-500/20" : ""
                      }`}
                    >
                      {listType === "directory" ? (
                        <svg
                          className="w-7 h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      ) : (
                        <svg
                          className={`w-7 h-7 ${iconStyle.color}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Name - Takes remaining space */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-base truncate group-hover:text-blue-600 transition-colors">
                        {name}
                      </h3>
                      {listType === "files" && (
                        <p className="text-xs text-gray-500 mt-0.5 uppercase">
                          {name.split(".").pop()} file
                        </p>
                      )}
                    </div>

                    {/* File type badge (optional, only in list view) */}
                    {listType === "files" && (
                      <div className="hidden md:block">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase">
                          {name.split(".").pop()}
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Action Buttons - Always visible in list view */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2">
                    {listType === "files" && (
                      <Link
                        to={`${BaseUrl}/files/${id}?action=download`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                      >
                        <FaDownload size={14} className="text-green-600" />
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (
                          isContextMenu.index === -1 ||
                          isContextMenu.index !== index
                        )
                          setIsContextMenu({ index, listType });
                        else setIsContextMenu({ index: -1, listType: null });
                      }}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <BsThreeDotsVertical
                        size={16}
                        className="text-gray-600"
                      />
                    </button>
                  </div>

                  {/* Context Menu */}
                  <ContextMenu
                    isOpen={
                      isContextMenu.index === index &&
                      isContextMenu.listType === listType
                    }
                    setIsContextMenu={setIsContextMenu}
                    id={id}
                    setIsPortalOpen={setIsPortalOpen}
                    name={name}
                    setInputValue={setInputValue}
                    listType={listType}
                    setSelectedItemId={setSelectedItemId}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    size={viewSize(size)}
                    path={path}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default DirItemListing;
