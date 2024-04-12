export const parseNumberParam = (
  param: string | undefined,
): number | undefined => {
  if (!param) {
    return undefined;
  }
  const parsedNumber = parseInt(param);

  if (!isNaN(parsedNumber) && parsedNumber > 0) {
    return parsedNumber;
  } else {
    return undefined;
  }
};
