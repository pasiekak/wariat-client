// Requires parameters as number with two decimal places
const calculateBrutto = (netto: number) => {
  const VAT = Number((netto * 0.23).toFixed(2));
  return Number((netto + VAT).toFixed(2));
};

const calculateNetto = (brutto: number) => {
  return Number((brutto / 1.23).toFixed(2));
};

const calculateFinalPrice = (
  brutto: number,
  percentage: number,
  quantity: number,
) => {
  if (percentage > 0)
    return parseFloat(
      ((brutto - brutto * (percentage / 100)) * quantity).toFixed(2),
    );
  return parseFloat((brutto * quantity).toFixed(2));
};

const calculateDifference = (
  brutto: number,
  percentage: number,
  quantity: number,
) => {
  const normalPrice = calculateFinalPrice(brutto, 0, quantity);
  const priceWithDiscount = calculateFinalPrice(brutto, percentage, quantity);
  return parseFloat((normalPrice - priceWithDiscount).toFixed(2));
};

export {
  calculateNetto,
  calculateBrutto,
  calculateFinalPrice,
  calculateDifference,
};
