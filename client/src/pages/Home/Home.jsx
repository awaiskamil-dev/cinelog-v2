import { useState } from "react";
import SearchBar from "./SearchBar";
import MovieRow from "./MovieRow";
import MovieCard from "./MovieCard";
import './Home.css';

const Home = function(){
  const [searchInput, setSearchInput] = useState('');
  const [genreSelect, setGenreSelect] = useState('Any');
  const [yearSelect, setYearSelect] = useState('Any');
  const [formatSelect, setFormatSelect] = useState('Any');
  const [results, setResults] = useState([]);

  const filtersActive = 
    searchInput !== '' ||
    genreSelect !== 'Any' ||
    yearSelect !== 'Any' ||
    formatSelect !== 'Any';

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
        setResults={setResults}
      />

      {filtersActive? 
      (
        <div className="results-grid">
          <h2>RESULTS</h2>
          <div className="results-section">
            {results.map((item) => {
              return <MovieCard key={item.id} movie={item}/>
            })}
          </div>
        </div>
      )
      : (
        <div className="movie-grid">
          <MovieRow title={'TRENDING NOW'} endpoint={'movies/trending'}/>
          <MovieRow title={'POPULAR MOVIES'} endpoint={'movies/popular'}/>
          <MovieRow title={'POPULAR TV SHOWS'} endpoint={'tv/popular'}/>
          <MovieRow title={'TOP RATED MOVIES'} endpoint={'movies/top-rated'}/>
          <MovieRow title={'TOP RATED TV SHOWS'} endpoint={'tv/top-rated'}/>
          <MovieRow title={'UPCOMING MOVIES'} endpoint={'movies/upcoming'}/>
          <MovieRow title={'ACTION MOVIES'} endpoint={'movies/action'}/>
          <MovieRow title={'ANIMATION'} endpoint={'movies/animation'}/>
        </div>
      )
      }
    </>
  );
};

export default Home;