export default function PostSkeletonPulse() {
    return (
      <div className="w-full max-w-2xl  bg-black border border-gray-800 rounded-md  overflow-hidden">
        <div className="p-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-800 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-24 bg-gray-800 rounded-full animate-pulse" />
              <div className="h-2 w-32 bg-gray-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        <div className="px-5 pb-5 pt-3">
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded-full animate-pulse" />
            <div className="h-4 bg-gray-800 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    )
  }
  
  