export type useDisplayReturns = {
  display: "grid" | "list";
  changeDisplay: (display: "grid" | "list") => void;
};