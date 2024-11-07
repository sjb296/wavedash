import { useState } from "react";
import PulldownMenu from "../PulldownMenu/PulldownMenu";
import HamburgerSvg from "../HamburgerSvg/HamburgerSvg";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="card mt-3 sticky">
        <div className="flex justify-between">
          <img src="/images/wavedash-high-resolution-logo-transparent.svg" alt="Wavedash logo" className="h-6" />
          {/* Hamburger menu */}
          <button onClick={toggleMenu}>
            <HamburgerSvg />
          </button>
        </div>
      </div>
      <PulldownMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Nav