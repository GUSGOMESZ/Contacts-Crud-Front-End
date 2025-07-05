export function LoadingCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gray-700/50 rounded-xl"></div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-700/50 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-700/50 rounded-lg"></div>
            </div>
          </div>

          <div className="h-6 bg-gray-700/50 rounded-lg mb-3 w-3/4"></div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-full"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
