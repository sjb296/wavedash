const LoadingScreen = ({ className }: { className?: string }) => {
  return (
    <div className={"fixed inset-0 bg-white w-screen h-screen z-40 flex justify-center items-center fadeout " + className}>
      <div className="text-center flex flex-col gap-4">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" className="h-20 animate-bounce" alt="Wavedash logo" />
        <p className="text-2xl text-slate-500">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen