import { Dispatch, SetStateAction, useEffect, useState } from "react";

type key = string;
type storageObject = Storage;

export function useLocalStorage<T>(key: key, defaultValue: T) {
  return useStorage<T>(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: key, defaultValue: T) {
  return useStorage<T>(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: key,
  defaultValue: T,
  storageObject: storageObject,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue];
}
