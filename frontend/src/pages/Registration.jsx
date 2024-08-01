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
          <FormInput
            id="username"
            label="benutzername"
            name="username"
            type="text"
            autocomplete="username"
          />
          <FormInput id="email" label="email" name="email" type="email" />
          <FormInput
            id="password"
            label="password"
            name="password"
            type="password"
            autocomplete="new-password"
          />
          <div className="flex-center mt-2">
            <Button text="registrieren" block={true} />
          </div>
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
