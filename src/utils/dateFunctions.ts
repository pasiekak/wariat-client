export const getNowDateTimeToInputString = () => {
  let now = new Date();
  const offset = now.getTimezoneOffset();
  now = new Date(now.getTime() - offset * 60 * 1000);
  return now.toISOString().slice(0, 16);
};

export const getNowDateToInputString = () => {
  let now = new Date();
  const offset = now.getTimezoneOffset();
  now = new Date(now.getTime() - offset * 60 * 1000);
  return now.toISOString().slice(0, 10);
};

export const parseToInputDateString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().slice(0, 10);
};

export const isFutureDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  return inputDate > currentDate;
};

export const isNewDate = (date: Date): boolean => {
  const now = new Date();

  const difference = now.getTime() - date.getTime();
  const daysDifference = Math.floor(difference / (1000 * 3600 * 24));
  return daysDifference <= 7;
};
