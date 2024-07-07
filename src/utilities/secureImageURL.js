// Utility function to replace "http" URL with "https"
export const secureImageUrl = (url) => {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};
