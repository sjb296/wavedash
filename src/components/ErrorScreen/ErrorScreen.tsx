const ErrorScreen = ({ className }: { className?: string }) => {
  return (
    <div className={"fixed inset-0 bg-white dark:bg-black w-screen h-screen z-50 flex justify-center items-center fadein " + className}>
      <div className="text-center flex flex-col gap-4 m-10">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-20" />
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">Apologies, we've run into a problem. Please try again later.</p>
        <p className="text-sm">If this problem persists, please <a href="mailto:sambarker247@gmail.com" target="_blank" className="text-blue-500">email me</a> and let me know.</p>
      </div>
    </div>
  )
}

export default ErrorScreen