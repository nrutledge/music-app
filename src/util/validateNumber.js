// Return only valid numbers or negative signs
export default (number) => {
  if (!isNaN(number) && number !== '-') {
    return 0;
  } else {
    return number;
  }
}