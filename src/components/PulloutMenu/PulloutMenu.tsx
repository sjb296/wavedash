import { MouseEventHandler } from "react"

function PulloutMenu(
  {
    isOpen, toggleMenu
  }: {
    isOpen: boolean,
    toggleMenu: MouseEventHandler
  }
) {
  return (
    <>
      <div onClick={toggleMenu} className={
        "absolute top-0 right-0 w-screen h-screen bg-black transition-opacity duration-300 ease-in-out overflow-hidden "
        + (isOpen ? "opacity-50 visible" : "opacity-0 invisible")
      }></div>
      <div
        className={
          "absolute top-0 right-0 w-screen h-1/3 bg-white transition-transform duration-300 ease-in-out overflow-hidden "
          + (isOpen ? "translate-y-0 shadow-lg" : "-translate-y-full")
        }>
        <button onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <li>
          <ul>Home</ul>
          <ul>Settings</ul>
        </li>
      </div>

    </>
  )
}

export default PulloutMenu