export function setZero(value) {
  if (isNaN(value)) {
    value = 0;
  }

  return value;
}
