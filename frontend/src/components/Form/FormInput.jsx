import "../Form/Form.css";

const FormInput = ({ label, name, type }) => {
  return (
    <div className="form-control">
      <label htmlFor="email" className="form-label">
        {label}
      </label>
      <input type={type} name={name} className="form-input" required />
    </div>
  );
};
export default FormInput;
