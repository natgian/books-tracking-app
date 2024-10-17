import UpdateBtn from "../Buttons/UpdateBtn";
import "./ProgressBar.css";

const ProgressBar = ({ currentPage, pageCount, updatedAt }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-wrapper">
        <span>Fortschritt:</span>
        <div className="progress-bar-count-wrapper">
          {/* VISUAL BAR */}
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          {/* PAGE COUNT */}
          <div>
            <p className="progress-bar-pagecount">
              {currentPage}/{pageCount} (
              {Math.round((currentPage / pageCount) * 100)}%)
            </p>
          </div>
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
