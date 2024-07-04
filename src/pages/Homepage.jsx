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
            alt="a woman sitting in a corner, in front of a window, reading a book"
            className="home-img"
          />
        </picture>
      </div>
    </div>
  );
};
export default Homepage;
