export default function round(value: number, decimals: number) {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
}
