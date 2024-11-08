import { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Footer,
  FormInput,
  Button,
  PageTitle,
  ShowPasswordBtn,
} from "../components";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useChangePassword } from "../hooks/useChangePassword";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
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
            <div className="password-input-container">
              <FormInput
                id="current-password"
                label="Aktuelles Passwort:"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                autocomplete="current-password"
                onChange={() => setFrontendErrorMessage("")}
              />
              {/* show/hide Current Password Button */}
              <ShowPasswordBtn
                showState={showCurrentPassword}
                setState={setShowCurrentPassword}
              />
            </div>

            {/* New Password */}
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
              {/* show/hide Current Password Button */}
              <ShowPasswordBtn
                showState={showNewPassword}
                setState={setShowNewPassword}
              />
            </div>

            {/* New Password Confirmation */}
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
              {/* show/hide Current Password Button */}
              <ShowPasswordBtn
                showState={showConfirmNewPassword}
                setState={setShowConfirmNewPassword}
              />
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
