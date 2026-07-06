import { useEffect } from "react";
import { Navbar, Footer, PageTitle, ScrollToTopBtn } from "../components";

const Imprint = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container">
        <PageTitle text="Impressum" lineWidth={"12rem"} />

        <section className="privacypolicy-container mt-4">
          <section className="privacypolicy-section-wrapper">
            <h2>Kontakt</h2>
            <p className="mt-1">
              Nathalie Giancaspro <br />
              Heinrichstrasse 10 <br />
              8304 wallisellen <br />
              Schweiz
            </p>
            <p>
              E-Mail: <a href="mailto:contact@natgian.dev">contact@natgian.dev</a>
            </p>
          </section>
          <section className="privacypolicy-section-wrapper">
            <h2>Haftungsausschluss</h2>
            <p className="mt-1">
              Ich übernehme keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Informationen auf dieser Website. Für Schäden, die aus dem Zugriff auf oder der Nutzung dieser Website
              entstehen, einschliesslich technischer Probleme, hafte ich nicht. Alle Inhalte sind unverbindlich und können ohne Ankündigung geändert oder entfernt werden.
            </p>
          </section>
          <section className="privacypolicy-section-wrapper">
            <h2>Hinweis zum Datenschutz</h2>
            <p className="mt-1">
              Informationen zum Umgang mit Personendaten sind in der{" "}
              <a href="/datenschutz" className="underline-link">
                Datenschutzerklärung.
              </a>
            </p>
          </section>
        </section>
      </section>
      <ScrollToTopBtn />
      <Footer />
    </main>
  );
};
export default Imprint;
