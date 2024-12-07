const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white w-screen h-screen z-50 flex justify-center items-center">
      <div className="text-center flex flex-col gap-4">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-20" />
        <p className="text-2xl text-slate-500">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen