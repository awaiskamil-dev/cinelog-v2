import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieRow from "./MovieRow";
import MovieCard from "./MovieCard";
import './Home.css';
import API_URL from "../../config";
import useAuth from '../../context/useAuth';

const Home = function(){
  const [searchInput, setSearchInput] = useState('');
  const [genreSelect, setGenreSelect] = useState('Any');
  const [yearSelect, setYearSelect] = useState('Any');
  const [formatSelect, setFormatSelect] = useState('Any');
  const [results, setResults] = useState([]);
  const [userEntries, setUserEntries] = useState([]);

  const {user} = useAuth();

  const filtersActive = 
    searchInput !== '' ||
    genreSelect !== 'Any' ||
    yearSelect !== 'Any' ||
    formatSelect !== 'Any';

    useEffect(() => {
      if(!user) return;

      const fetchUserEntries = async () => {
        const response = await fetch(`${API_URL}/entries/me`, {
          credentials: 'include'
        });
        const data = await response.json();
        setUserEntries(data.entries);
      };
      fetchUserEntries();
    }, [user]);

    const handleStatusChange = async (movie, clickedStatus) => {
      const previousEntries = userEntries;

      const existingEntry = userEntries.find(
        entry => entry.tmdbId === movie.id
      );

      const isRemoving = existingEntry?.status === clickedStatus;

      if (isRemoving) {
        setUserEntries(prev =>
          prev.filter(entry => entry.tmdbId !== movie.id)
        );
      } else if (existingEntry) {
        setUserEntries(prev =>
          prev.map(entry =>
            entry.tmdbId === movie.id
              ? { ...entry, status: clickedStatus }
              : entry
          )
        );
      } else {
        setUserEntries(prev => [
          ...prev,
          {
            title: movie.media_type === 'movie' ? movie.title : movie.name,
            tmdbId: movie.id,
            posterPath: movie.poster_path,
            status: clickedStatus
          }
        ]);
      }

      try {
        if (isRemoving) {
          const res = await fetch(`${API_URL}/entries/${movie.id}`, {
            method: 'DELETE',
            credentials: 'include'
          });

          if (!res.ok) {
            throw new Error('Failed to remove entry');
          }
        } else {
          const title =
            movie.media_type === 'movie' ? movie.title : movie.name;

          const res = await fetch(`${API_URL}/entries`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              title,
              tmdbId: movie.id,
              posterPath: movie.poster_path,
              status: clickedStatus
            })
          });

          if (!res.ok) {
            throw new Error('Failed to save entry');
          }
        }
      } catch (err) {
        console.log(err);
        setUserEntries(previousEntries);
      }
    };
    
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
              const myEntry = userEntries.find((entry) => entry.tmdbId === item.id);
              return <MovieCard key={item.id} movie={item} status={myEntry?.status} onStatusChange={handleStatusChange}/>
            })}
          </div>
        </div>
      )
      : (
        <div className="movie-grid">
          <MovieRow title={'TRENDING NOW'} endpoint={'movies/trending'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'POPULAR MOVIES'} endpoint={'movies/popular'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'POPULAR TV SHOWS'} endpoint={'tv/popular'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'TOP RATED MOVIES'} endpoint={'movies/top-rated'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'TOP RATED TV SHOWS'} endpoint={'tv/top-rated'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'UPCOMING MOVIES'} endpoint={'movies/upcoming'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'ACTION MOVIES'} endpoint={'movies/action'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
          <MovieRow title={'ANIMATION'} endpoint={'movies/animation'} userEntries={userEntries} onStatusChange={handleStatusChange}/>
        </div>
      )
      }
    </>
  );
};

export default Home;