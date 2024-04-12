export const refactorEmptyStrings = (obj: object) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (newObj[key] === "") {
        newObj[key] = null;
      }
    }
  }
  return newObj;
};

export const refactorZeros = (obj: object) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (newObj[key] === 0) {
        newObj[key] = null;
      }
    }
  }
  return newObj;
};

export const removeKeys = (obj: object, keysToRemove: string[]) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (keysToRemove.includes(key)) {
        delete newObj[key];
      }
    }
  }
  return newObj;
};

export const removeNulls = (obj: object) => {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (newObj[key] === null) {
        delete newObj[key];
      }
    }
  }
  return newObj;
};
