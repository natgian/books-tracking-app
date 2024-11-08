import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { token } = useParams();
  const { resetPassword, isLoading, isSuccess, errorMessage } =
    useResetPassword();

  // Pass resetPassword function to the hook with token
  const { handleSubmit, frontendErrorMessage, setFrontendErrorMessage } =
    usePasswordValidation(
      async (currentPassword, password) => {
        await resetPassword(token, password);
      },
      { requireCurrentPassword: false }
    );

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
            <p>
              Das Password wurde erfolgreich zurückgesetzt.{" "}
              <Link to="/login">Jetzt einloggen</Link>
            </p>
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

            <div className="password-input-container">
              <FormInput
                id="password"
                label="Neues Passwort:"
                name="password"
                type={showNewPassword ? "text" : "password"}
                autocomplete="new-password"
                placeholder="Muss mindestens 8 Zeichen lang sein"
                onChange={() => setFrontendErrorMessage("")}
              />
              {/* show/hide Password Button */}
              <button
                aria-label="Passwort anzeigen oder verbergen"
                type="button"
                className="show-password-btn"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <BiSolidShow /> : <BiSolidHide />}
              </button>
            </div>

            <div className="password-input-container">
              <FormInput
                id="confirm-password"
                label="Neues Passwort bestätigen:"
                name="confirm-password"
                type={showConfirmNewPassword ? "text" : "password"}
                autocomplete="new-password"
                placeholder="Muss mindestens 8 Zeichen lang sein"
                onChange={() => setFrontendErrorMessage("")}
              />
              {/* show/hide Password Button */}
              <button
                aria-label="Passwort anzeigen oder verbergen"
                type="button"
                className="show-password-btn"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              >
                {showConfirmNewPassword ? <BiSolidShow /> : <BiSolidHide />}
              </button>
            </div>

            {/* FRONTEND ERROR MESSAGE */}
            {frontendErrorMessage && (
              <p className="error-message mt-1 text-center">
                {frontendErrorMessage}
              </p>
            )}
            {/* SAVE BUTTON */}
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
