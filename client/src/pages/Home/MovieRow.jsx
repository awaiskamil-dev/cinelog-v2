import { useEffect, useState } from "react";
import API_URL from "../../config";
import './MovieRow.css';
import MovieCard from "./MovieCard";

const MovieRow = function({title, endpoint, userEntries, onStatusChange}){
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`${API_URL}/${endpoint}`);
      const data = await response.json();
      setResults(data.results);
    };

    fetchResults();
  }, [endpoint, setResults]);

  return (
    <div className="movie-row-section">
      <h2>{title}</h2>
      <div className="scroll-container">
        <button className="scroll-left">
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="movie-row-div">
          {results.map((item) => {
            const myEntry = userEntries.find((entry) => entry.tmdbId === item.id);
            return <MovieCard key={item.id} movie={item} status={myEntry?.status} onStatusChange={onStatusChange}/>
          })}
        </div>
        <button className="scroll-right">
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default MovieRow;