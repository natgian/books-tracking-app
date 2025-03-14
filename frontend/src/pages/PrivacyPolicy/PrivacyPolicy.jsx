import { useEffect } from "react";
import { Navbar, Footer, PageTitle, ScrollToTopBtn } from "../../components";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container">
        <PageTitle text="Datenschutzerklärung" lineWidth={"17rem"} />

        <section className="privacypolicy-container mt-4">
          <section className="privacypolicy-section-wrapper">
            <h2>1. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3>Datenschutz</h3>
            <p>
              Der Schutz deiner persönlichen Daten wird sehr ernst genommen.
              Deine personenbezogenen Daten werden vertraulich und entsprechend
              den gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung behandelt. Deine Daten werden nie an Dritte
              weitergegeben.
            </p>
            <p>
              Wenn du diese Webandwendung benutzt, werden verschiedene
              personenbezogene Daten erhoben. Personenbezogene Daten sind Daten,
              mit denen du persönlich identifiziert werden kannst. Die
              vorliegende Datenschutzerklärung erläutert, welche Daten erhoben
              werden und wofür diese genutzt werden.
            </p>
            <p>
              Es wird darauf hingewiesen, dass die Datenübertragung im Internet
              (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken
              aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff
              durch Dritte ist nicht möglich.
            </p>

            <h3 className="datenschutz-h3">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel
              der Verarbeitung von personenbezogenen Daten (z.B. Namen,
              E-Mail-Adressen usw.) entscheidet.
            </p>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p>
              Nathalie Giancaspro <br />
              E-Mail:{" "}
              <a href="mailto:info@natgian.com" className="underline-link">
                info@natgian.com
              </a>
            </p>

            <h3 className="datenschutz-h3">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben deine personenbezogenen
              Daten gespeichert, bis der Zweck für die Datenverarbeitung
              entfällt. Wenn du ein berechtigtes Löschersuchen geltend machst
              oder eine Einwilligung zur Datenverarbeitung widerrufst, werden
              deine Daten gelöscht.
            </p>

            <h3 className="datenschutz-h3">
              Auskunft, Berichtigung und Löschung
            </h3>
            <p>
              Du hast im Rahmen der geltenden gesetzlichen Bestimmungen
              jederzeit das Recht auf unentgeltliche Auskunft über deine
              gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
              auf Berichtigung oder Löschung dieser Daten.
            </p>

            <h3 className="datenschutz-h3">SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte, die du sendest, eine SSL- bzw.
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du
              daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo;
              auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in
              deiner Browserzeile.
            </p>
            <p>
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die
              Daten, die du übermittelst, nicht von Dritten mitgelesen werden.
            </p>
          </section>

          <section className="privacypolicy-section-wrapper">
            <h2 className="datenschutz-h2 mt-1">2. Verarbeitung der Daten</h2>

            <h3 className="datenschutz-h3">
              Datenerfassung auf dieser Website
            </h3>
            <h4 className="datenschutz-h4">Wie werden deine Daten erfasst?</h4>
            <p>
              Für die Benutzung dieser Webanwendung musst du ein Benutzerkonto
              erstellen. Bei der Registrierung eines Benutzerkontos werden
              folgende Daten erhoben: Benutzername, Passwort und E-Mail Adresse.
            </p>

            <p>
              Andere Daten werden automatisch oder nach deiner Einwilligung beim
              Besuch der Website durch die IT-Systeme erfasst. Das sind vor
              allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
              automatisch, sobald du diese Website besuchst.
            </p>

            <h4 className="datenschutz-h4">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten kannst du dem Abschnitt
              &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
              Datenschutzerklärung entnehmen.
            </p>

            <h4 className="datenschutz-h4">Wofür werden die Daten genutzt?</h4>
            <p>
              Die Daten werden für die Aktivierung und Authentifizierung des
              Benutzers verwendet. Ein weiterer Teil der Daten wird erhoben, um
              eine fehlerfreie Bereitstellung der Website zu gewährleisten.
            </p>
            <h4 className="datenschutz-h4">
              Welche Rechte hast du bezüglich deiner Daten?
            </h4>
            <p>
              Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
              Empfänger und Zweck deiner gespeicherten personenbezogenen Daten
              zu erhalten. Du hast ausserdem ein Recht, die Berichtigung oder
              Löschung dieser Daten zu verlangen. Wenn du eine Einwilligung zur
              Datenverarbeitung erteilt hast, kannst du diese Einwilligung
              jederzeit für die Zukunft widerrufen. Ausserdem hast du das Recht,
              unter bestimmten Umständen die Einschränkung der Verarbeitung
              deiner personenbezogenen Daten zu verlangen. Des Weiteren steht
              dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section className="privacypolicy-section-wrapper">
            <h2 className="datenschutz-h2 mt-1">3. Plugins und Tools</h2>
            <h3 className="datenschutz-h3">Google Fonts</h3>
            <p>
              Diese Website nutzt zur einheitlichen Darstellung von Schriftarten
              so genannte Google Fonts, die von Google bereitgestellt werden.
              Beim Aufruf einer Seite lädt dein Browser die benötigten Fonts in
              deinen Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
            </p>
            <p>
              Zu diesem Zweck muss der von dir verwendete Browser Verbindung zu
              den Servern von Google aufnehmen. Hierdurch erlangt Google
              Kenntnis darüber, dass über deine IP-Adresse diese Website
              aufgerufen wurde. Die Nutzung von Google Fonts erfolgt auf
              Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat
              ein berechtigtes Interesse an der einheitlichen Darstellung des
              Schriftbildes auf seiner Website. Sofern eine entsprechende
              Einwilligung abgefragt wurde, erfolgt die Verarbeitung
              ausschliesslich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
              &sect; 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung
              von Cookies oder den Zugriff auf Informationen im Endgerät des
              Nutzers (z.B. Device-Fingerprinting) im Sinne des TTDSG umfasst.
              Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p>
              Wenn dein Browser Google Fonts nicht unterstützt, wird eine
              Standardschrift von deinem Computer genutzt.
            </p>
            <p>
              Weitere Informationen zu Google Fonts findest du unter{" "}
              <a
                href="https://developers.google.com/fonts/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-link"
              >
                https://developers.google.com/fonts/faq
              </a>{" "}
              und in der Datenschutzerklärung von Google:{" "}
              <a
                href="https://policies.google.com/privacy?hl=de"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-link"
              >
                https://policies.google.com/privacy?hl=de
              </a>
              .
            </p>
            <p>
              Das Unternehmen verfügt über eine Zertifizierung nach dem
              &bdquo;EU-US Data Privacy Framework&ldquo; (DPF). Der DPF ist ein
              Übereinkommen zwischen der Europäischen Union und den USA, der die
              Einhaltung europäischer Datenschutzstandards bei
              Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem
              DPF zertifizierte Unternehmen verpflichtet sich, diese
              Datenschutzstandards einzuhalten. Weitere Informationen hierzu
              erhalten Sie vom Anbieter unter folgendem Link:{" "}
              <a
                href="https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt000000001L5AAI&status=Active"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-link overflow-wrap-anywhere"
              >
                https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt000000001L5AAI&status=Active
              </a>
            </p>
          </section>

          <section className="privacypolicy-section-wrapper">
            <h2 className="datenschutz-h2 mt-1">4. Schlussbestimmungen</h2>
            <p>
              Diese Datenschutzerklärung kann jederzeit angepasst und ergänzt
              werden. Über solche Anpassungen und Ergänzungen wird in geeigneter
              Form informiert, insbesondere durch Veröffentlichung der jeweils
              aktuellen Datenschutzerklärung auf der Website.
            </p>
          </section>

          <p>Stand: 25.10.2024</p>
        </section>
      </section>
      <ScrollToTopBtn />
      <Footer />
    </main>
  );
};
export default PrivacyPolicy;
