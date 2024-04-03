import { IMark } from "../../../api/types/IMark";

export type useMarkFilterReturns = {
  marks: IMark[];
  selectedMarks: IMark[];
  addMarkFilter: (mark: IMark) => void;
  removeMarkFilter: (mark: IMark) => void;
  clearMarkFilters: () => void;
};
