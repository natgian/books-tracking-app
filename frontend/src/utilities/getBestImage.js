import defaultCover from "../assets/no-cover.jpg";
// Utility function to get best image
export const getBestImage = (imageLinks) => {
  if (!imageLinks) {
    return defaultCover;
  }
  if (imageLinks.medium) {
    return imageLinks.medium;
  } else if (imageLinks.small) {
    return imageLinks.small;
  } else if (imageLinks.thumbnail) {
    return imageLinks.thumbnail;
  } else {
    return defaultCover; // Replace with your default fallback image URL
  }
};
