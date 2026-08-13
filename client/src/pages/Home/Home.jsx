import { useState } from "react";
import SearchBar from "./SearchBar";

const Home = function(){
  const [searchInput, setSearchInput] = useState('');
  const [genreSelect, setGenreSelect] = useState('Any');
  const [yearSelect, setYearSelect] = useState('Any');
  const [formatSelect, setFormatSelect] = useState('Any');
  const [results, setResults] = useState([]);

  return (
    <>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        genreSelect={genreSelect}
        setGenreSelect={setGenreSelect}
        yearSelect={yearSelect}
        setYearSelect={setYearSelect}
        formatSelect={formatSelect}
        setFormatSelect={setFormatSelect}
        results={results}
        setResults={setResults}
      />
    </>
  );
};

export default Home;