export const isValidISBN = (isbn) => {
  const cleanedISBN = isbn.replace(/-/g, "");

  if (/^[0-9]{10}$/.test(cleanedISBN)) {
    return isValidISBN10(cleanedISBN);
  } else if (/^[0-9]{13}$/.test(cleanedISBN)) {
    return isValidISBN13(cleanedISBN);
  }

  return false;
};

const isValidISBN10 = (isbn10) => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (i + 1) * parseInt(isbn10[i]);
  }
  const check = isbn10[9].toUpperCase();
  sum += check === "X" ? 10 : parseInt(check);

  return sum % 11 === 0;
};

const isValidISBN13 = (isbn13) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn13[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = 10 - (sum % 10);

  return check === parseInt(isbn13[12]);
};
