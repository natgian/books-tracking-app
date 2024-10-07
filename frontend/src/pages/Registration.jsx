import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { register, error, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents from refreshing the page

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      setErrorMessage("Passwörter stimmen nicht überein.");
      return;
    }

    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password,
    };

    const { success, error: registrationError } = await register(newUser);

    if (success) {
      navigate("/");
    } else {
      setErrorMessage(registrationError);
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

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <p className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}

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
