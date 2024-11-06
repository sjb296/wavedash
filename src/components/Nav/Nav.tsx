import { useState } from "react";
import PulloutMenu from "../PulloutMenu/PulloutMenu";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="card mt-3">
        <div className="flex justify-between">
          <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-6" />
          {/* Hamburger menu */}
          <button onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <PulloutMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Nav