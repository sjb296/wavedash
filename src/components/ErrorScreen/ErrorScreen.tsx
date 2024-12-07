const ErrorScreen = ({ className }: { className?: string }) => {
  return (
    <div className={"fixed inset-0 bg-white w-screen h-screen z-50 flex justify-center items-center fadein " + className}>
      <div className="text-center flex flex-col gap-4 m-10">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-20" />
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg text-slate-700">Apologies, we've run into a problem. Please try again later.</p>
        <p className="text-sm text-slate-500">If this problem persists, please <a href="mailto:sambarker247@gmail.com" target="_blank" className="text-blue-500">email me</a> and let me know.</p>
        {/* Reload button */}
        <button className="btn-secondary" onClick={window.location.reload}>Reload</button>
      </div>
    </div>
  )
}

export default ErrorScreen