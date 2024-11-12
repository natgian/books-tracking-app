import { useState, useEffect } from "react";

const Button = ({ text, block, onClick, type = "button" }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  // Tracking if device format is mobile for component adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      className={`${isMobile ? "btn btn-small" : "btn"} ${
        block ? "btn-block" : ""
      }`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
