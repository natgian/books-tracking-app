import { useEffect, useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottom, setBottom] = useState("1rem");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Calculate the distance from the bottom of the page
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // Check if the user has scrolled past 300px or is close to the bottom
      if (scrollTop > 300) {
        setIsVisible(true);
        if (distanceFromBottom < 100) {
          setBottom("11rem");
        } else {
          setBottom("1rem");
        }
      } else {
        setIsVisible(false);
      }
    };

    // Scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
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
        style={{ bottom }}
        onClick={scrollToTop}
      >
        <BiUpArrowAlt />
      </button>
    )
  );
};
export default ScrollToTopBtn;
