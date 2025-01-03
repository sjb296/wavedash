const SkeletonBestDay = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-md font-semibold text-start">Best for sailing</h1>
      <div className="flex flex-row justify-center items-center gap-3 px-12">
        {/* Skeletons */}
        {/* Date group */}
        <div className="flex flex-col gap-1.5">
          <div
            className="h-4 w-8 bg-gray-300 dark:bg-slate-800 rounded-md animate-pulse"
          />
          <div
            className="h-4 w-8 bg-gray-300 dark:bg-slate-800 rounded-md animate-pulse"
          />
          <div
            className="h-4 w-8 bg-gray-300 dark:bg-slate-800 rounded-md animate-pulse"
          />
        </div>
        {/* Star rating */}
        <div className="h-4 w-14 bg-gray-300 dark:bg-slate-800 rounded-md animate-pulse" />
      </div>
    </div>
  )
}

export default SkeletonBestDay