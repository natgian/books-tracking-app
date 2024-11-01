import { Navbar, Footer, FormInput, Button, PageTitle } from "../components";
import { Form, useParams, Link } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

const ResetPassword = () => {
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
            <FormInput
              id="password"
              label="Neues Passwort:"
              name="password"
              type="password"
              autocomplete="new-password"
              placeholder="Muss mindestens 8 Zeichen lang sein"
              onChange={() => setFrontendErrorMessage("")}
            />
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
