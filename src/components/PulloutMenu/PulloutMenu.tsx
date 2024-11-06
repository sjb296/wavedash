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
    <div
      className={
        "absolute top-0 right-0 w-screen h-screen bg-white transition-transform duration-300 ease-in-out "
        + (isOpen ? "-translate-x-0" : "translate-x-full")
      }>
      <button onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  )
}

export default PulloutMenu