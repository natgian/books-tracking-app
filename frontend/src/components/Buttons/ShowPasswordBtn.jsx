import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const ShowPasswordBtn = ({ showState, setState }) => {
  return (
    <button
      aria-label="Passwort anzeigen oder verbergen"
      type="button"
      className="show-password-btn"
      onClick={() => setState((prev) => !prev)}
    >
      {showState ? <BiSolidShow /> : <BiSolidHide />}
    </button>
  );
};
export default ShowPasswordBtn;
