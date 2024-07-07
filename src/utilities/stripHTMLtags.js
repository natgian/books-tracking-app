// Utility function to strip HTML tags using regex
export const stripHTMLtags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
