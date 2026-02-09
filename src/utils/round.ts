type RoundParams = {
  value: number;
  decimals: number;
};

export default function round({ value, decimals }: RoundParams) {
  return Number(
    `${Math.round(parseFloat(`${value}e${decimals}`))}e-${decimals}`,
  );
}
