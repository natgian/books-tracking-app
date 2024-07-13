import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <ul className="footer-links">
        <li>
          <a href="#">Kontakt</a>
        </li>
        <li>
          <a href="#">Datenschutzerklärung</a>
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
