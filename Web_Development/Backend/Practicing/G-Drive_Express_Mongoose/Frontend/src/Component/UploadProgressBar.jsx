

function UploadProgressBar({filename, controller, dataTransfer}) {
  return (
    <div
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
          <span className="font-medium text-gray-800 truncate">{filename}</span>
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

export default UploadProgressBar;
