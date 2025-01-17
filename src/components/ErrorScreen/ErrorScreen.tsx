const ErrorScreen = ({ className, err }: { className?: string, err?: string }) => {
  let errorMessage = err
  let errorIsLocationPermissionDenied = false
  if (err === "User denied Geolocation") {
    console.error("User denied Geolocation")
    errorMessage = "You have denied the app's request for location. Please grant location permissions and try again."
    errorIsLocationPermissionDenied = true
  } else if (err === "Network error. Check DevTools console for more information.") {
    errorMessage = "There has been a network error. Please check your internet connection and try again."
  }

  return (
    <div className={"fixed inset-0 bg-white dark:bg-black w-screen h-screen z-50 flex justify-center items-center fadein " + className}>
      <div className="text-center flex flex-col gap-4 m-10 justify-center items-center">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-20" />
        <h1 className="text-3xl font-bold">Error</h1>
        <p className="text-lg">Apologies, we've run into a problem.</p>
        <p className="text-lg">{errorMessage ? errorMessage : err}</p>
        {/* {errorIsLocationPermissionDenied ? <a className="btn-primary" href="app-settings:">Open App Settings</a> : <></>} */}
        <button className="text-blue-500"
          onClick={() => window.location.reload()}>Reload app</button>
      </div>
    </div>
  )
}

export default ErrorScreen