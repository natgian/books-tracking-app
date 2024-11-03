// Navbar CSS
import "./Navbar.css";
// Logo
import logo from "../../assets/logo_leseoase.png";
// BoxIcons
import {
  BiSolidHome,
  BiSolidUser,
  BiSolidBookmark,
  BiMenu,
} from "react-icons/bi";
import { CgClose } from "react-icons/cg";
// Components
import Button from "../Buttons/Button";
// React
import { useState, useRef, useMemo, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// Hooks
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [showLinks, setShowLinks] = useState(false);
  const menuContainerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowLinks((prev) => !prev);
  };

  const closeMenu = () => {
    setShowLinks(false);
  };

  // Handle clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    if (showLinks) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or showLinks changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinks]);

  // calculating the height of the menu container based on whether showLinks is true or false
  // using "useMemo" to ensure that linkStyles is only recalculated when showLinks changes
  const linkStyles = useMemo(
    () => ({
      height: showLinks
        ? `${menuRef.current.getBoundingClientRect().height}px`
        : "0px",
    }),
    [showLinks]
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {/* Menu-Button */}
          <button
            type="button"
            className="nav-toggle"
            aria-label="Menu"
            onClick={toggleMenu}
          >
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
            {user && (
              <>
                <ul className="links">
                  <li>
                    <NavLink to="/" onClick={closeMenu}>
                      <BiSolidHome />
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/leselisten" onClick={closeMenu}>
                      <BiSolidBookmark />
                      Leselisten
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profil" onClick={closeMenu}>
                      <BiSolidUser />
                      Profil
                    </NavLink>
                  </li>
                </ul>
              </>
            )}

            {/* Login/Logout-Button */}
            {!user ? (
              <Link to="/login">
                <Button text="Anmelden" />
              </Link>
            ) : (
              <Button text="Abmelden" onClick={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
