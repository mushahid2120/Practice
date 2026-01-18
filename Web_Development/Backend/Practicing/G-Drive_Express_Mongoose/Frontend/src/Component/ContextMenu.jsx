import React, { useState } from "react";

function ContextMenu({
  isOpen,
  id,
  setIsContextMenu,
  setIsPortalOpen,
  name,
  setInputValue,
  listType,
  setSelectedItemId,
  createdAt,
  updatedAt,
  size,
  path
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    isOpen && (
      <div
        className="absolute right-2 top-14 z-50 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Rename Option */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-150 group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setInputValue(name);
            setSelectedItemId(id);
            setIsPortalOpen({
              header: `Rename ${listType}`,
              submitBtn: "Save Changes",
            });
            setIsContextMenu({ index: -1, listType: null });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <span className="font-medium text-sm">Rename</span>
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Delete Option */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition-all duration-150 group"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectedItemId(id);
            setIsPortalOpen({
              header: `Delete ${listType}`,
              submitBtn: "Delete",
            });
            // await handleDelete(id);
            setIsContextMenu({ index: -1, listType: null });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <span className="font-medium text-xs">Delete</span>
        </button>
        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Detail Option */}
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition-all duration-150 group"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDetailsOpen(true);
            // setIsContextMenu({ index: -1, listType: null });
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-medium text-xs">View Detail</span>
        </button>
        {isDetailsOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => {
              setIsDetailsOpen(false);
              setIsContextMenu({ index: -1, listType: null });
            }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full  overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {listType==="files" ? "File":"Folder"} Details
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setIsContextMenu({ index: -1, listType: null });
                    }}
                    className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content - Pre-filled with dummy data */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex items-start gap-2 py-1 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xs font-semibold text-gray-600  tracking-wide mb-1">
                      Name :{" "}
                      <span className="text-sm font-medium text-gray-800 break-all">
                        {name}
                      </span>
                    </div>
                  </div>

                  {/* Path */}
                  <div className="flex items-start gap-2 py-1 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xs font-semibold text-gray-600  tracking-wide mb-1">
                      Path :{" "}
                      <span className="text-sm font-medium text-gray-800 break-all">
                       {path && path.map(item=>item.name).join(' / ')}
                      </span>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="flex items-start gap-2 py-1 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xs font-semibold text-gray-600  tracking-wide mb-1">
                      Size :{" "}
                      <span className="text-sm font-medium text-gray-800 break-all">
                        {size}
                      </span>
                    </div>
                  </div>

                  {/* Created */}
                  <div className="flex items-start gap-2 py-1 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <span className="text-xs font-semibold text-gray-600  tracking-wide mb-1">
                      Created :{" "}
                      <span className="text-sm font-medium text-gray-800 break-all">
                        {new Date(createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>

                  {/* Modified */}
                  <div className="flex items-start gap-2 py-1 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="text-xs font-semibold text-gray-600  tracking-wide mb-1">
                      Modified : {"  "}
                      <span className="text-sm font-medium text-gray-800 break-all">
                        {new Date(updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default ContextMenu;
