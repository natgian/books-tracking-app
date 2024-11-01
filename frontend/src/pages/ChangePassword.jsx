import { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useChangePassword } from "../hooks/useChangePassword";

const ChangePassword = () => {
  const { changePassword, isLoading, isSuccess, errorMessage, successMessage } =
    useChangePassword();
  const navigate = useNavigate();

  // Pass resetPassword function to the hook with token
  const { handleSubmit, frontendErrorMessage, setFrontendErrorMessage } =
    usePasswordValidation(
      async (currentPassword, password) => {
        await changePassword(currentPassword, password);
      },
      { requireCurrentPassword: true }
    );

  // Redirect to profile page after showing success message for 2 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/profil");
      }, 2000); // 2000ms = 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    }
  }, [isSuccess, navigate]);

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {errorMessage && (
          <p className="error-message mt-1 text-center">{errorMessage}</p>
        )}

        {isSuccess ? (
          <div className="text-center success-message">
            <p>{successMessage}</p>
          </div>
        ) : (
          <Form method="POST" className="form" onSubmit={handleSubmit}>
            <PageTitle text="Passwort ändern" lineWidth="15rem" />

            {/* hidden username input for accessibility guideline */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            {/* INPUTS */}
            {/* Current Password */}
            <FormInput
              id="current-password"
              label="Aktuelles Passwort:"
              name="currentPassword"
              type="password"
              autocomplete="current-password"
              onChange={() => setFrontendErrorMessage("")}
            />
            {/* New Password */}
            <FormInput
              id="password"
              label="Neues Passwort:"
              name="password"
              type="password"
              autocomplete="new-password"
              placeholder="Muss mindestens 8 Zeichen lang sein"
              onChange={() => setFrontendErrorMessage("")}
            />
            {/* New Password Confirmation */}
            <FormInput
              id="confirm-password"
              label="Neues Passwort bestätigen:"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              placeholder="Muss mindestens 8 Zeichen lang sein"
              onChange={() => setFrontendErrorMessage("")}
            />

            {/* FRONTEND ERROR MESSAGE */}
            {frontendErrorMessage && (
              <p className="error-message mt-1 text-center">
                {frontendErrorMessage}
              </p>
            )}
            {/* SAVE BUTTON */}
            <div className="flex-center mt-2">
              <Button
                text={isLoading ? "Wird geändert..." : "Speichern"}
                block={true}
                type="submit"
              />
            </div>
            <div className="flex-center">
              <Link to="/profil" className="underline-link mt-1">
                zurück zum Profil
              </Link>
            </div>
          </Form>
        )}
      </section>
      <Footer />
    </main>
  );
};
export default ChangePassword;
