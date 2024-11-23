import { useState } from "react";
import {
  Navbar,
  Footer,
  FormInput,
  Button,
  PageTitle,
  Loading,
} from "../components";
import { Form } from "react-router-dom";
import { useSendResetPasswordMail } from "../hooks/useSendResetPasswordMail";
import { BiCheck } from "react-icons/bi";

const ForgotPassword = () => {
  const { sendResetPasswordMail, isLoading, errorMessage, isSuccess } =
    useSendResetPasswordMail();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");

    await sendResetPasswordMail(email);
  };

  return (
    <main className="main-layout">
      <header>
        <Navbar />
      </header>

      <section className="section-container form-container">
        {isLoading ? (
          <Loading />
        ) : isSuccess ? (
          <div className="form">
            <PageTitle text="E-Mail versendet" lineWidth="15rem" />
            <div className="flex-center">
              <BiCheck
                style={{
                  fontSize: "6rem",
                  color: "var(--success)",
                }}
              />
            </div>
            <p className="mt-2">
              Ein Link zur Zurücksetzung deines Passworts wurde an deine E-Mail
              Adresse gesendet.
            </p>
            <p className="mt-2 mb-1">
              Solltest du keine E-Mail in deinem Posteingang vorfinden,
              überprüfe bitte deinen Spam-Ordner.
            </p>
          </div>
        ) : (
          <>
            {/*  ERROR MESSAGE */}
            {errorMessage && (
              <p className="error-message text-center mt-1">{errorMessage}</p>
            )}

            <Form method="POST" className="form" onSubmit={handleSubmit}>
              <PageTitle text="Passwort vergessen" lineWidth="16rem" />
              <p className="mt-2">
                Gib deine registrierte E-Mail Adresse ein und klicke auf
                "Passwort zurücksetzen".
              </p>
              <p className="mt-1">
                Du erhältst anschliessend eine E-Mail mit einem Link um dein
                Passwort zurückzusetzen.
              </p>
              <p className="mt-1">
                Solltest du keine E-Mail erhalten, überprüfe deinen Spam-Ordner.
              </p>

              {/* INPUTS */}
              <FormInput
                id="email"
                label="E-Mail Adresse:"
                name="email"
                type="email"
                autocomplete="email"
                defaultValue=""
              />
              {/* SUBMIT BUTTON */}
              <div className="flex-center mt-2">
                <Button
                  text="Passwort zurücksetzen"
                  block={true}
                  type="submit"
                />
              </div>
            </Form>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
};
export default ForgotPassword;
