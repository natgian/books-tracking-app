// Box Icons:
import { BiSolidHome, BiSolidUser, BiSolidBookmark } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="main-nav">
      {/* Logo */}
      <div>LOGO</div>

      <div className="main-nav-container">
        {/* Links */}
        <ul className="main-nav-links">
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
        {/* Login/Logout Button */}
        <button className="btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
