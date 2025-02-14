import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CookieBanner = () => {
  const cookieName = "agreedCookie";
  const [showBanner, setShowBanner] = useState(false);

  const getAgreeCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      if (cookie.startsWith(name + "=")) {
        return cookie.split("=")[1];
      }
      return null;
    }
  };

  const setAgreeCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  useEffect(() => {
    if (!getAgreeCookie(cookieName)) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setAgreeCookie(cookieName, "true", 30);
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div className="cookies-banner-container">
        <div className="medium-dark-wrapper">
          <div className="cookies-banner">
            <p>
              Hey! Diese Website nutzt ausschliesslich notwendige Cookies, um dir eine sichere Anmeldung und
              grundlegende Funktionen zu ermöglichen. Da diese Cookies technisch erforderlich sind, können sie nicht
              deaktiviert werden. Mehr Infos findest du in der{" "}
              <Link to="/datenschutz" target="_blank">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <button className="agree-btn" onClick={handleAccept}>
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default CookieBanner;
