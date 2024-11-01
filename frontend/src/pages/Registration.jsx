import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, Link, useNavigate, useLocation } from "react-router-dom";

const Registration = () => {
  const [frontendErrorMessage, setFrontendErrorMessage] = useState("");
  const { register, backendError, setBackendError, isLoading } = useRegister();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    // prevents from refreshing the page
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    // Reset any existing error messages
    setFrontendErrorMessage("");
    setBackendError(null);

    // Frontend validation
    if (!username || username.length < 2) {
      setFrontendErrorMessage(
        "Der Benutzername muss mindestens 2 Zeichen lang sein."
      );
      console.log("Username validation failed.");
      return;
    }

    if (!password || password.length < 8) {
      setFrontendErrorMessage(
        "Das Passwort muss mindestens 8 Zeichen lang sein."
      );
      console.log("Password validation failed.");
      return;
    }

    if (password !== confirmPassword) {
      setFrontendErrorMessage("Passwörter stimmen nicht überein.");
      console.log("Password validation failed.");
      return;
    }

    const newUser = { username, email, password };

    const { success, error: registrationError } = await register(newUser);

    if (success) {
      navigate(from);
    } else {
      setBackendError(registrationError);
    }
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        <Form method="POST" className="form" onSubmit={handleSubmit}>
          <PageTitle text="Registrieren" lineWidth="10rem" />
          {/* INPUTS */}
          <FormInput
            id="username"
            label="Benutzername:"
            name="username"
            type="text"
            autocomplete="username"
            placeholder="Muss mindestens 2 Zeichen lang sein"
            onChange={() => setFrontendErrorMessage("")}
          />
          <FormInput
            id="email"
            label="E-Mail Adresse:"
            name="email"
            type="email"
            autocomplete="email"
            onChange={() => setFrontendErrorMessage("")}
          />
          <FormInput
            id="password"
            label="Passwort:"
            name="password"
            type="password"
            autocomplete="new-password"
            placeholder="Muss mindestens 8 Zeichen lang sein"
            onChange={() => setFrontendErrorMessage("")}
          />
          <FormInput
            id="confirm-password"
            label="Passwort bestätigen:"
            name="confirm-password"
            type="password"
            autocomplete="new-password"
            placeholder="Muss mindestens 8 Zeichen lang sein"
            onChange={() => setFrontendErrorMessage("")}
          />

          {/* DISPLAY FRONTEND OR BACKEND ERROR MESSAGE */}
          {frontendErrorMessage && (
            <p className="error-message mt-1">{frontendErrorMessage}</p>
          )}
          {/* BACKEND ERROR MESSAGE */}
          {backendError && <p className="error-message mt-1">{backendError}</p>}

          {/* REGISTER BUTTON */}
          <div className="flex-center mt-2">
            <Button
              type="submit"
              text="registrieren"
              block={true}
              disabled={isLoading}
            />
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
