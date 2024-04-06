import { useEffect, useState } from "react";
import { useMarkFilterReturns } from "../types/useMarkFilterReturns";
import { IMark } from "../../../api/types/IMark";
import useMark from "../../../api/hooks/mark/useMark";
import { useSessionStorage } from "../../../hooks/useStorage";

const useMarkFilter = (): useMarkFilterReturns => {
  const [marks, setMarks] = useState<IMark[]>([]);
  const [selectedMarks, setSelectedMarks] = useSessionStorage<IMark[]>(
    "products-selected-marks",
    [],
  );

  const { data } = useMark();

  useEffect(() => {
    if (data?.marks) {
      setMarks(data.marks);
    }
  }, [data?.marks]);

  useEffect(() => {
    if (marks.length > 0 && selectedMarks.length > 0) {
      setSelectedMarks((prev) =>
        prev.filter((selectedMark) =>
          marks.some((mark) => selectedMark.name === mark.name),
        ),
      );
    }
  }, [marks.length, selectedMarks.length]);

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
