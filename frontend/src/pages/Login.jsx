import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Form, Link } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Button";

const Login = () => {
  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        <Form method="POST" className="form">
          <h1 className="form-title">Anmelden</h1>
          <div className="underline-title"></div>
          <FormInput id="email" label="email" name="email" type="email" />
          <FormInput
            id="password"
            label="password"
            name="password"
            type="password"
            autocomplete="current-password"
          />
          <div className="flex-center mt-2">
            <Button text="anmelden" block={true} />
          </div>
          <div className="form-links-container">
            <Link to="/registration" className="form-link">
              Noch nicht registriert?
            </Link>
            <Link to="#" className="form-link">
              Passwort vergessen?
            </Link>
          </div>
        </Form>
      </section>
      <Footer />
    </main>
  );
};
export default Login;
