export default (value, min, max) => {
  if (value == null) { return 0; }
  if (value < min) { return min; }
  if (value > max) { return max; }

  return value;
}