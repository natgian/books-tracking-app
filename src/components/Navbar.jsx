// BoxIcons:
import { BiSolidHome, BiSolidUser, BiSolidBookmark } from "react-icons/bi";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="main-nav">
      {/* Logo */}
      <div>LESEOASE</div>

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
        <Button text="Login" />
      </div>
    </nav>
  );
};
export default Navbar;
