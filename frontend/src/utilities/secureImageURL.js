// Utility function to replace "http" URL with "https"
export const secureImageURL = (url) => {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};
