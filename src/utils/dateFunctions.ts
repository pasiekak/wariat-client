export const getNowDateToInputString = () => {
  let now = new Date();
  const offset = now.getTimezoneOffset();
  now = new Date(now.getTime() - offset * 60 * 1000);
  return now.toISOString().slice(0, 16);
};

export const isFutureDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  return inputDate > currentDate;
};
