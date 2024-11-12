import "../../index.css";
import { useState, useEffect } from "react";

const UpdateBtn = ({ text, block, onClick }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Tracking if device format is mobile for component adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <button
      type="button"
      className={`update-btn ${block ? "btn-block" : ""} ${
        isMobile ? "update-btn-small" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default UpdateBtn;
