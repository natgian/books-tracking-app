const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <ul>
        <li>Kontakt</li>
        <li>Datenschutzerklärung</li>
      </ul>
      <p>
        Copyright &#169; {currentYear} -{" "}
        <a href="https://www.natgian.com/de" target="blank">
          natgian.com
        </a>
      </p>
    </footer>
  );
};
export default Footer;
