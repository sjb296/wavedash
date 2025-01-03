import { MouseEventHandler } from "react"
// import { FaGear, FaHouse } from "react-icons/fa6"

const PulloutMenu = (
  {
    isOpen, toggleMenu
  }: {
    isOpen: boolean,
    toggleMenu: MouseEventHandler
  }
) => {
  return (
    <>
      {/* Background-darkening effect */}
      <div onClick={toggleMenu} className={
        "pulldown-darken z-10 "
        + (isOpen ? "opacity-50 visible" : "opacity-0 pointer-events-none")
      }></div>
      {/* Pulldown frame */}
      <div
        className={
          "pulldown-frame z-10 "
          + (isOpen ? "translate-y-0 shadow-lg" : "-translate-y-full")
        }>
        <div className="flex justify-between mb-6">
          <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-6" />
          <button onClick={toggleMenu} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col text-xl gap-3">
          {/* <a href="#">
            <ul className="flex items-center gap-2"><FaHouse className="text-blue-400" />Home</ul>
          </a>
          <a href="#">
            <ul className="flex items-center gap-2"><FaGear className="text-blue-400" />Settings</ul>
          </a> */}
          <a className="text-sm text-blue-400" rel="preconnect" href="/privacy.html">Privacy policy</a>
          <a className="text-sm text-blue-400" href="https://sambarker.xyz" target="_blank">
            <ul>
              <li>Wavedash by Sam Barker. Click here and check out my site!</li>
            </ul>
          </a>
          <p className="text-xs text-slate-600">Disclaimer: This app and any data displayed herein are NOT to be used for navigation. I am not responsible for any damages that may occur from using this app.</p>

        </div>
      </div>
    </>
  )
}

export default PulloutMenu