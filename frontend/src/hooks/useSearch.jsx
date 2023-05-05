import { useState } from "react";
import debounce from "../helper/debounce";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const handleSearch = debounce((data) => setSearch(data));
  return { search, handleSearch };
};

export default useSearch;
