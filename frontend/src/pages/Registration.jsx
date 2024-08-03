import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Form, Link } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";

const Registration = () => {
  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        <Form method="POST" className="form">
          <h1 className="form-title">Registrieren</h1>
          <div className="underline-title"></div>
          {/* INPUTS */}
          <FormInput
            id="username"
            label="Benutzername:"
            name="username"
            type="text"
            autocomplete="username"
          />
          <FormInput
            id="email"
            label="E-Mail Adresse:"
            name="email"
            type="email"
            autocomplete="email"
          />
          <FormInput
            id="password"
            label="Passwort:"
            name="password"
            type="password"
            autocomplete="new-password"
          />
          <FormInput
            id="confirm-password"
            label="Passwort bestätigen:"
            name="confirm-password"
            type="password"
            autocomplete="new-password"
          />
          {/* REGISTER BUTTON */}
          <div className="flex-center mt-2">
            <Button text="registrieren" block={true} />
          </div>
          {/* LINKS */}
          <div className="form-links-container">
            <Link to="/login" className="form-link">
              Schon registriert?
            </Link>
          </div>
        </Form>
      </section>
      <Footer />
    </main>
  );
};
export default Registration;
