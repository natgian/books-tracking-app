import { useState, useEffect } from "react";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const fromMessage = location.state?.message;

  // Set location message initially from location state
  useEffect(() => {
    setLocationMessage(fromMessage || "");
  }, [fromMessage]);

  // Clear the location message after a few seconds
  useEffect(() => {
    if (locationMessage) {
      const timer = setTimeout(() => setLocationMessage(""), 5000); // 5000 ms = 5 seconds
      return () => clearTimeout(timer); // Clean up the timer if component unmounts
    }
  }, [locationMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { success, error } = await login(formData);

    if (success) {
      navigate(from);
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {/* ERROR MESSAGE FROM LOCATION STATE */}
        {locationMessage && (
          <p className="error-message text-center mb-1">{locationMessage}</p>
        )}

        <Form method="POST" className="form" onSubmit={handleSubmit}>
          <PageTitle text="Anmelden" lineWidth="8rem" />

          {/* BACKEND ERROR MESSAGE */}
          {errorMessage && (
            <p className="error-message text-center mt-1">{errorMessage}</p>
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
            <Button
              text={isLoading ? "Wird angemeldet..." : "Anmelden"}
              block={true}
              type="submit"
            />
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
            <Link to="/passwort-vergessen" className="form-link">
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
