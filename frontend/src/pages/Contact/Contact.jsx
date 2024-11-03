import {
  Navbar,
  Footer,
  PageTitle,
  FormInput,
  FormTextarea,
  Button,
  Loading,
} from "../../components";
import "./Contact.css";
import { useEffect } from "react";
import { Form, Link } from "react-router-dom";
import { useSendContactForm } from "../../hooks/useSendContactForm";
import { BiCheck } from "react-icons/bi";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { sendContactForm, isLoading, errorMessage, isSuccess } =
    useSendContactForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const message = formData.get("message");

    await sendContactForm(email, name, message);
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {isSuccess ? (
          <div className="form">
            <PageTitle text="Nachricht versendet" lineWidth="15rem" />
            <div className="flex-center">
              <BiCheck
                style={{
                  fontSize: "6rem",
                  color: "var(--success)",
                }}
              />
            </div>
            <p className="mt-2 mb-2 text-center">
              Danke für die Nachricht. Ich werde mich schnellstmöglich
              zurückmelden.
            </p>
            <Link to="/" className="underline-link text-center">
              Zurück zur Startseite
            </Link>
          </div>
        ) : (
          <Form
            method="POST"
            className="contact-wrapper"
            onSubmit={handleSubmit}
          >
            <PageTitle text="Kontakt" lineWidth={"6rem"} />
            <p className="mt-1">
              Du hast Fragen, Feedback oder Ideen, wie ich die App besser machen
              kann?
            </p>
            <p className="mt-1">
              Schreib mir über das Formular unten, und ich melde mich so schnell
              wie möglich bei dir.
            </p>

            {/*  ERROR MESSAGE */}
            {errorMessage && (
              <p className="error-message text-center mt-1">{errorMessage}</p>
            )}

            <FormInput
              id="name"
              label="Name:"
              name="name"
              type="text"
              autocomplete="name"
            />

            <FormInput
              id="email"
              label="E-Mail:"
              name="email"
              type="email"
              autocomplete="email"
            />

            <FormTextarea id="message" name="message" label="Nachricht:" />
            <div className="flex-center mt-2">
              <Button
                text={isLoading ? "Wird versendet..." : "Nachricht senden"}
                block={true}
                type="submit"
              />
            </div>
          </Form>
        )}
      </section>

      <Footer />
    </main>
  );
};
export default Contact;
