import { useEffect, useRef, useState } from "react";
import API_URL from "../../config";
import './MovieRow.css';
import MovieCard from "./MovieCard";
import useToast from '../../context/ToastContext/useToast';
import MovieCardSkeleton from "../../components/MovieCardSkeleton";

const MovieRow = function({title, endpoint, userEntries, onStatusChange}){
  const [results, setResults] = useState([]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const [loading, setLoading] = useState(true);

  const {showToast} = useToast();
  const movieRowRef = useRef(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      try{
        const response = await fetch(`${API_URL}/${endpoint}`);
        const data = await response.json();
        setResults(data.results);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
      
    };
    fetchResults();
  }, [endpoint, setResults]);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      showToast('Server is waking up. This may take a moment.', 'info');
    }, 6000);

    return () => clearTimeout(timer);
  }, [loading, showToast]);

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
        <button className={`scroll-left ${showLeftBtn && !loading? '' : 'hidden'}`} onClick={scrollLeft}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className={`movie-row-div ${loading ? 'loading' : ''}`} ref={movieRowRef}>
          {loading? 
            (
              Array.from({ length: 11 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
            )
            :(results.map((item) => {
              const myEntry = userEntries.find((entry) => entry.tmdbId === item.id);
              return <MovieCard key={item.id} movie={item} status={myEntry?.status} onStatusChange={onStatusChange}/>
            })) 
          }
        </div>
        <button className={`scroll-right ${showRightBtn && !loading? '' : 'hidden'}`} onClick={scrollRight}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}

export default MovieRow;