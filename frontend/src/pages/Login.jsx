import { useState } from "react";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const message = location.state?.message;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { success, error: loginError } = await login(formData);

    if (success) {
      navigate(from);
    } else {
      setErrorMessage(loginError);
    }
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {/* ERROR MESSAGE FROM LOCATION STATE */}
        {message && (
          <p className="mb-1" style={{ color: "red" }}>
            {message}
          </p>
        )}

        <Form method="POST" className="form" onSubmit={handleSubmit}>
          <PageTitle text="Anmelden" lineWidth="8rem" />

          {/* LOGIN ERROR MESSAGE */}
          {errorMessage && (
            <p
              className="error-message text-center mt-1"
              style={{ color: "red" }}
            >
              {errorMessage}
            </p>
          )}

          {/* INPUTS */}
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
            autocomplete="current-password"
          />
          {/* LOGIN BUTTON */}
          <div className="flex-center mt-2">
            <Button text="anmelden" block={true} type="submit" />
          </div>
          {/* LINKS */}
          <div className="form-links-container">
            <Link
              to="/registration"
              state={{ from: location.state?.from }}
              className="form-link"
            >
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
