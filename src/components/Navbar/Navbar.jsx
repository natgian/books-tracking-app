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
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const menuContainerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowLinks(!showLinks);
  };

  const closeMenu = () => {
    setShowLinks(false);
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
          <div className="logo">
            <Link to="/" className="logo">
              LESEOASE
            </Link>
          </div>
          {/* Menu-Button */}
          <button type="button" className="nav-toggle" onClick={toggleMenu}>
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
                <NavLink to="/" onClick={closeMenu}>
                  <BiSolidHome />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/leseliste" onClick={closeMenu}>
                  <BiSolidBookmark />
                  Leseliste
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil" onClick={closeMenu}>
                  <BiSolidUser />
                  Profil
                </NavLink>
              </li>
            </ul>
            {/* Login/Logout-Button */}
            <Button text="LOGIN" />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
