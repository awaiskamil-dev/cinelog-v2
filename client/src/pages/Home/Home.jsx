import { useState } from "react";
import SearchBar from "./SearchBar";
import MovieRow from "./MovieRow";
import MovieCard from "./MovieCard";
import './Home.css';
import useUserEntries from '../../context/UserEntriesContext/useUserEntries';

const Home = function(){
  const [searchInput, setSearchInput] = useState('');
  const [genreSelect, setGenreSelect] = useState('Any');
  const [yearSelect, setYearSelect] = useState('Any');
  const [formatSelect, setFormatSelect] = useState('Any');
  const [results, setResults] = useState([]);

  const {userEntries, handleIconChange} = useUserEntries();

  const filtersActive = 
    searchInput !== '' ||
    genreSelect !== 'Any' ||
    yearSelect !== 'Any' ||
    formatSelect !== 'Any';
    
  return (
    <div className="page-container">
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
            {results.length === 0? 
              (
                <div className="no-results">
                  No Results
                </div>
              )
              :(
                results.map((item) => {
                  const myEntry = userEntries.find((entry) => entry.tmdbId === item.id);
                  return <MovieCard key={item.id} movie={item} status={myEntry?.status} onStatusChange={handleIconChange}/>
                })
              ) 
            }
          </div>
        </div>
      )
      : (
        <div className="movie-grid">
          <MovieRow title={'TRENDING NOW'} endpoint={'movies/trending'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'POPULAR MOVIES'} endpoint={'movies/popular'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'POPULAR TV SHOWS'} endpoint={'tv/popular'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'TOP RATED MOVIES'} endpoint={'movies/top-rated'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'TOP RATED TV SHOWS'} endpoint={'tv/top-rated'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'UPCOMING MOVIES'} endpoint={'movies/upcoming'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'ACTION MOVIES'} endpoint={'movies/action'} userEntries={userEntries} onStatusChange={handleIconChange}/>
          <MovieRow title={'ANIMATION'} endpoint={'movies/animation'} userEntries={userEntries} onStatusChange={handleIconChange}/>
        </div>
      )
      }
    </div>
  );
};

export default Home;