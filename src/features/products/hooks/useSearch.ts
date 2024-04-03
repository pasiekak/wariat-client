import { useState } from "react";
import { useSearchReturns } from "../types/useSearchReturns";

const useSearch = (): useSearchReturns => {
  const [searchWord, setSearchWord] = useState("");

  const changeSearchWord = (word: string) => setSearchWord(word);

  return { searchWord, changeSearchWord };
};

export default useSearch;
