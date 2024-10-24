import UpdateBtn from "../Buttons/UpdateBtn";
import "./ProgressBar.css";

const ProgressBar = ({ currentPage, pageCount, updatedAt, openModal }) => {
  const progressPercentage = Math.round((currentPage / pageCount) * 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-wrapper">
        <span>Fortschritt:</span>
        <div className="progress-bar-count-wrapper">
          {/* VISUAL BAR */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {/* PAGE COUNT */}
          <div>
            <p className="progress-bar-pagecount">
              {currentPage}/{pageCount} ({progressPercentage}%)
            </p>
          </div>
        </div>
      </div>
      {/* UPDATE BUTTON */}
      <div>
        <UpdateBtn text="Fortschritt aktualisieren" onClick={openModal} />
      </div>
    </div>
  );
};
export default ProgressBar;
