// Navbar CSS
import "./Navbar.css";

// BoxIcons
import {
  BiSolidHome,
  BiSolidUser,
  BiSolidBookmark,
  BiMenu,
} from "react-icons/bi";
import { CgClose } from "react-icons/cg";

// Components
import Button from "../Button";

// React
import { useState, useRef } from "react";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const menuContainerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linkStyles = {
    height: showLinks
      ? `${menuRef.current.getBoundingClientRect().height}px`
      : "0px",
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          {/* Logo */}
          <div className="logo">LESEOASE</div>
          {/* Menu-Button */}
          <button type="button" className="nav-toggle" onClick={toggleLinks}>
            {showLinks ? <CgClose /> : <BiMenu />}
          </button>
        </div>

        <div
          className="links-container"
          ref={menuContainerRef}
          style={linkStyles}
        >
          <div className="menu-wrapper" ref={menuRef}>
            {/* Links */}
            <ul className="links">
              <li>
                <a href="#">
                  <BiSolidHome />
                  Home
                </a>
              </li>
              <li>
                <a href="#">
                  <BiSolidBookmark />
                  Leseliste
                </a>
              </li>
              <li>
                <a href="#">
                  <BiSolidUser />
                  Profil
                </a>
              </li>
            </ul>
            {/* Login/Logout-Button */}
            <Button text="Login" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
