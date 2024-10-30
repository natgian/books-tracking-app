import { useState } from "react";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, useParams, Link } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword, isLoading, isSuccess, errorMessage } =
    useResetPassword();
  const [frontendErrorMessage, setFrontendErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    // Reset any existing error messages
    setFrontendErrorMessage("");

    // Frontend validation
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

    await resetPassword(token, password);
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {errorMessage && (
          <p
            className="error-message mt-1 text-center"
            style={{ color: "red" }}
          >
            {errorMessage}
          </p>
        )}
        {isSuccess ? (
          <div className="text-center">
            <p className="mb-1">
              Das Password wurde erfolgreich zurückgesetzt.
            </p>
            <Link to="/login" className="underline-link">
              Login
            </Link>
          </div>
        ) : (
          <Form method="POST" className="form" onSubmit={handleSubmit}>
            <PageTitle text="Passwort zurücksetzen" lineWidth="19rem" />

            {/* hidden username input for accessibility guideline */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            {/* INPUTS */}
            <FormInput
              id="password"
              label="Neues Passwort:"
              name="password"
              type="password"
              autocomplete="new-password"
              onChange={() => setFrontendErrorMessage("")}
            />
            <FormInput
              id="confirm-password"
              label="Neues Passwort bestätigen:"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              onChange={() => setFrontendErrorMessage("")}
            />
            {/* FRONTEND ERROR MESSAGE */}
            {frontendErrorMessage && (
              <p
                className="error-message mt-1 text-center"
                style={{ color: "red" }}
              >
                {frontendErrorMessage}
              </p>
            )}
            {/* LOGIN BUTTON */}
            <div className="flex-center mt-2">
              <Button
                text={isLoading ? "Wird zurückgesetzt..." : "Speichern"}
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
export default ResetPassword;
