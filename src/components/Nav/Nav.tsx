import { useState } from "react";
import PulloutMenu from "../PulloutMenu/PulloutMenu";
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
      <PulloutMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  )
}

export default Nav