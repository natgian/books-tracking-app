import { Link, useRouteError } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import notFoundImage from "../assets/page-not-found.svg";
import errorImage from "../assets/error.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <section className="error-container">
        <img
          src={notFoundImage}
          alt="Error 404 - Seite nicht gefunden"
          className="error-image"
        />
        <p className="error-title mt-2 mb-1">Hoppla! Seite nicht gefunden</p>
        <Link to="/" className="error-link">
          Zurück zur Startseite
        </Link>
      </section>
    );
  }

  return (
    <section className="text-center error-container">
      <img src={errorImage} alt="Error - Etwas ist schiefgelaufen" />
      <p className="error-title mt-2 mb-1">Hoppla! Etwas ist schiefgelaufen.</p>
      <Link to="/" className="error-link">
        Zurück zur Startseite
      </Link>
      <div className="error-box">
        <BiErrorCircle />
        {error.message}
      </div>
    </section>
  );
};
export default Error;
