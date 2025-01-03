import { useState } from "react"

const StartScreen = (
  {
    className,
    getLocation,
  }: {
    className?: string,
    getLocation: () => void,
  }) => {

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div
      id="start-screen"
      className={"fixed inset-0 bg-white dark:bg-black w-screen h-screen z-40 flex justify-center items-center align-middle p-12 " + className}>
      <div className="text-center flex flex-col gap-4 items-center">
        {/* Logo */}
        <img src="/images/wavedash-high-resolution-logo-transparent.svg" className="h-20" alt="Wavedash logo" />
        {/* Body - only show if the user hasn't given location permission yet */}
        {
          window.localStorage.getItem("hasGivenLocationPermission") === "false" || window.localStorage.getItem("hasGivenLocationPermission") === null
            ?
            <>
              <h1 className="text-2xl font-medium">Welcome to Wavedash!</h1>
              <p className="text-lg">
                This app requires your location to provide accurate weather data.
                Please allow access to your location to continue.
              </p>
              <button className="bg-blue-400 dark:bg-blue-600 text-white rounded-3xl py-3 px-5 m-0 font-medium w-36"
                onClick={() => {
                  getLocation()
                  setIsLoading(true)
                  window.localStorage.setItem("hasGivenLocationPermission", "true")
                }}
                aria-label="Get location"
              >
                {isLoading ? "Loading..." : "Get started!"}
              </button>
            </>
            : <></>
        }

      </div>
    </div>
  )
}

export default StartScreen