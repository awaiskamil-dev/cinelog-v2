import './MovieCard.css';

const MovieCard = function({movie, status, onStatusChange}){
  const title = movie.media_type === 'movie' ? movie.title : movie.name;
  /*const year = movie.media_type === 'movie'
    ? movie.release_date?.slice(0, 4)
    : movie.first_air_date?.slice(0, 4);
  */
  if (!movie.poster_path) return null;

  return (
    <div className="movie-card">
      <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={title}/>
      <div className="movie-name">{title}</div>
      <div className="card-overlay">
        <i 
          className={`fa-solid fa-eye ${status === 'watched' ? 'active' : ''}`}
          onClick={() => onStatusChange(movie, 'watched')}>
        </i>
        <i 
          className={`fa-solid fa-bookmark ${status === 'plan-to-watch' ? 'active' : ''}`} 
          onClick={() => onStatusChange(movie, 'plan-to-watch')}>
        </i>
      </div>
    </div>
  );  
};

export default MovieCard;