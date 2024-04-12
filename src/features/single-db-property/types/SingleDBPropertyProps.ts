export type SingleDBPropertyProps = {
  modifiable?: boolean;
  attributeName?: string;
  putURL?: string;
  input?: string;
  updateContextValueFN?: (val: string | number, attribute: string) => void;
  getURL: string;
  labelText: string;
  initialValue?: string | number;
};
