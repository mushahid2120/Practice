
function ShimmerLoading() {
  return (
    <div className="space-y-6">
      {/* Folders Section Shimmer */}
      <div className="space-y-3">
        {/* Section Header Shimmer */}
        <div className="h-12  bg-gray-200 rounded-lg w-full animate-pulse mb-4"></div>

        {/* Grid View Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

              {/* Content */}
              <div className="w-14 h-14 rounded-xl bg-gray-200 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Files Section Shimmer */}
      <div className="space-y-3">
        {/* Section Header Shimmer */}
        <div className="h-5 bg-gray-200 rounded w-24 animate-pulse mb-4"></div>

        {/* Grid View Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

              {/* Content */}
              <div className="w-14 h-14 rounded-xl bg-gray-200 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShimmerLoading;
