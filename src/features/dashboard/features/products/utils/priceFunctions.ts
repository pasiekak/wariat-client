// Requires parameters as number with two decimal places
const calculateBrutto = (netto: number) => {
  const VAT = Number((netto * 0.23).toFixed(2));
  return Number((netto + VAT).toFixed(2));
};

const calculateNetto = (brutto: number) => {
  return Number((brutto / 1.23).toFixed(2));
};

export { calculateNetto, calculateBrutto };
