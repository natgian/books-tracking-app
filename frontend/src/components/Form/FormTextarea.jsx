import "../Form/Form.css";

const FormTextarea = ({ id, label, name }) => {
  return (
    <div className="form-control">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        className="form-textarea"
        rows="10"
        required
      ></textarea>
    </div>
  );
};
export default FormTextarea;
