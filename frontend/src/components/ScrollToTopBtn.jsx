import { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Entferne den Event-Listener bei der Bereinigung
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        type="button"
        className="scroll-to-top-btn"
        aria-label="Nach oben scrollen"
        onClick={scrollToTop}
      >
        <BiUpArrowAlt />
      </button>
    )
  );
};
export default ScrollToTopBtn;
