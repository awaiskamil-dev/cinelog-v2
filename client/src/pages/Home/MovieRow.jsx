import { useEffect, useRef, useState } from "react";
import API_URL from "../../config";
import './MovieRow.css';
import MovieCard from "./MovieCard";

const MovieRow = function({title, endpoint, userEntries, onStatusChange}){
  const [results, setResults] = useState([]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const movieRowRef = useRef(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`${API_URL}/${endpoint}`);
      const data = await response.json();
      setResults(data.results);
    };

    fetchResults();
  }, [endpoint, setResults]);

  useEffect(() => {
    const cardsDiv = movieRowRef.current;
    if (!cardsDiv) return;

    const updateButtons = () => {
      setShowLeftBtn(cardsDiv.scrollLeft > 0);
      setShowRightBtn(
        cardsDiv.scrollLeft + cardsDiv.clientWidth < cardsDiv.scrollWidth - 1
      );
    };

    updateButtons(); 

    cardsDiv.addEventListener('scroll', updateButtons);

    return () => {
      cardsDiv.removeEventListener('scroll', updateButtons);
    };
  }, [results]);

  const scrollLeft = () => {
    movieRowRef.current.scrollBy({ left: -600, behavior: 'smooth' });
  };

  const scrollRight = () => {
    movieRowRef.current.scrollBy({ left: 600, behavior: 'smooth' });
  };

  return (
    <div className="movie-row-section">
      <h2>{title}</h2>
      <div className="scroll-container">
        <button className={`scroll-left ${showLeftBtn? '' : 'hidden'}`} onClick={scrollLeft}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="movie-row-div" ref={movieRowRef}>
          {results.map((item) => {
            const myEntry = userEntries.find((entry) => entry.tmdbId === item.id);
            return <MovieCard key={item.id} movie={item} status={myEntry?.status} onStatusChange={onStatusChange}/>
          })}
        </div>
        <button className={`scroll-right ${showRightBtn? '' : 'hidden'}`} onClick={scrollRight}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default MovieRow;