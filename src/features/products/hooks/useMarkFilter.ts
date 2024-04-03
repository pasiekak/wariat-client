import { useEffect, useState } from "react";
import { useMarkFilterReturns } from "../types/useMarkFilterReturns";
import { IMark } from "../../../api/types/IMark";
import useMark from "../../../api/hooks/mark/useMark";

const useMarkFilter = (): useMarkFilterReturns => {
  const [marks, setMarks] = useState<IMark[]>([]);
  const [selectedMarks, setSelectedMarks] = useState<IMark[]>([]);

  const { data } = useMark();

  useEffect(() => {
    if (data?.marks) {
      setMarks(data.marks);
    }
  }, [data?.marks]);

  const addMarkFilter = (mark: IMark) => {
    setSelectedMarks((prev) => [...prev, mark]);
  };

  const removeMarkFilter = (mark: IMark) => {
    setSelectedMarks((prev) => prev.filter((m) => m.id !== mark.id));
  };

  const clearMarkFilters = () => {
    setSelectedMarks([]);
  };

  return {
    marks,
    selectedMarks,
    addMarkFilter,
    removeMarkFilter,
    clearMarkFilters,
  };
};

export default useMarkFilter;
