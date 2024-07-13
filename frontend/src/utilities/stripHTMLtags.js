// Utility function to strip HTML tags using regex
export const stripHTMLtags = (text) => {
  if (!text) {
    return "";
  }
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};
