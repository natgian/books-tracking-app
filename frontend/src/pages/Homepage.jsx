import largeHomeImage from "../assets/large-home-image.jpg";
import smallHomeImage from "../assets/small-home-image.jpg";

const Homepage = () => {
  return (
    <div className="home-container">
      <p className="intro-text">
        Finde <strong>Bücher</strong>, erstelle <strong>Leselisten</strong> und
        behalte den Überblick mit dem <strong>Lesetracker</strong>.
      </p>

      <div className="image-wrapper">
        <picture>
          <source media="(min-width: 768px)" srcSet={largeHomeImage} />
          <img
            src={smallHomeImage}
            alt="Eine Frau sitzt in einer gemütlichen Ecke, vor einem Fenster, und liest ein Buch."
            className="home-img"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
};
export default Homepage;
