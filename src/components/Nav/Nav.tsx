import { useState } from "react";
import PulldownMenu from "../PulldownMenu/PulldownMenu";
import HamburgerSvg from "../HamburgerSvg/HamburgerSvg";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="card mt-3 sticky">
        <div className="flex justify-between items-center">
          <a href="#"><img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-6" width="24px" height="24px" /></a>
          {/* Hamburger menu */}
          <button aria-label="Toggle menu" onClick={toggleMenu}>
            <HamburgerSvg />
          </button>
        </div>
      </div>
      <PulldownMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Nav