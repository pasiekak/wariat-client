export const findHighestObjectAttribute = (listOfObjects, attribute) => {
  if (listOfObjects.length > 0) {
    return listOfObjects.reduce((max, obj) =>
      obj[attribute] > max[attribute] ? obj : max,
    )[attribute];
  } else {
    return 1;
  }
};
