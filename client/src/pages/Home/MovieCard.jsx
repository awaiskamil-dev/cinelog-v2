import './MovieCard.css';
import {useNavigate} from 'react-router';

const MovieCard = function({movie, status, onStatusChange}){
  const navigate = useNavigate();

  const title = movie.media_type === 'movie' ? movie.title : movie.name;
  if (!movie.poster_path) return null;

  const handleCardClick = () => {
    navigate(`/${movie.media_type}/${movie.id}`);
  };

  const handleIconClick = (e, clickedStatus) => {
    e.stopPropagation();
    onStatusChange(movie, clickedStatus);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={title}/>
      <div className="movie-name">{title}</div>
      <div className="card-overlay">
        <i 
          className={`fa-solid fa-eye ${status === 'watched' ? 'active' : ''}`}
          onClick={(e) => handleIconClick(e, 'watched')}>
        </i>
        <i 
          className={`fa-solid fa-bookmark ${status === 'plan-to-watch' ? 'active' : ''}`} 
          onClick={(e) => handleIconClick(e, 'plan-to-watch')}>
        </i>
      </div>
    </div>
  );  
};

export default MovieCard;