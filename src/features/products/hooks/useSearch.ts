import { useSearchReturns } from "../types/useSearchReturns";
import { useSessionStorage } from "../../../hooks/useStorage";

const useSearch = (): useSearchReturns => {
  const [searchWord, setSearchWord] = useSessionStorage<string>(
    "products-search-word",
    "",
  );

  const changeSearchWord = (word: string) => setSearchWord(word);
  const clearSearchWord = () => setSearchWord("");

  return { searchWord, changeSearchWord, clearSearchWord };
};

export default useSearch;
