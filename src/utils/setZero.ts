export default function setZero(value: number) {
  if (isNaN(value)) {
    value = 0;
  }

  return value;
}
