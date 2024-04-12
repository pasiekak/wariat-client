export const isNIPValid = (nip: string) => {
  // Usuwanie spacji i myślników
  nip = nip.replace(/[ -]/g, "");

  // Sprawdzenie długości
  if (nip.length !== 10) {
    return false;
  }

  // Sprawdzenie, czy każdy znak jest liczbą
  if (!/^\d{10}$/.test(nip)) {
    return false;
  }

  // Obliczenie sumy kontrolnej
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(nip[i]) * weights[i];
  }
  const controlNumber = sum % 11;

  // Sprawdzenie poprawności sumy kontrolnej
  return controlNumber === parseInt(nip[9]);
};
