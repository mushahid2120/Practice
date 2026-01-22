import { useEffect } from "react";

function ToastPopup({ netErr, setNetErr }) {

  useEffect(() => {
    if (netErr) {
      const timer = setTimeout(() => {
        setNetErr("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [netErr]);
  if (netErr === "") return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="bg-white border-2 border-red-200 rounded-xl shadow-2xl overflow-hidden max-w-md">
        <div className="flex items-center gap-3 p-2">
          {/* Error Icon */}
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              {netErr}
            </h4>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setNetErr("")}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg
              className="w-5 h-5 text-gray-500"
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

        {/* Progress Bar */}
        <div className="h-1 bg-red-100">
          <div
            className="h-full bg-red-600 animate-shrink"
            style={{ animation: "shrink 10s linear forwards" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ToastPopup;
