import UpdateBtn from "../Buttons/UpdateBtn";
import "./ProgressBar.css";

const ProgressBar = () => {
  return (
    <div className="progress-bar-container">
      <div className="progress-wrapper">
        <span>Fortschritt:</span>
        {/* VISUAL BAR */}
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        {/* PAGE COUNT */}
        <div>
          <p className="progress-bar-pagecount">200/400 (50%)</p>
        </div>
      </div>
      {/* UPDATE BUTTON */}
      <div>
        <UpdateBtn />
      </div>
    </div>
  );
};
export default ProgressBar;
