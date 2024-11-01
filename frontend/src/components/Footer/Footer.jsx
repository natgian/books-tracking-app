import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <ul className="footer-links">
        <li>
          <Link to="/">Kontakt</Link>
        </li>
        <li>
          <Link to="/datenschutz">Datenschutzerklärung</Link>
        </li>
      </ul>
      <p>
        Copyright &#169; {currentYear} -{" "}
        <a
          href="https://www.natgian.com/de"
          target="blank"
          className="external-link"
        >
          natgian.com
        </a>
      </p>
    </footer>
  );
};
export default Footer;
