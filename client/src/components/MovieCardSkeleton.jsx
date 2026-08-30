import './MovieCardSkeleton.css';

const MovieCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster"></div>
      <div className="skeleton-title"></div>
    </div>
  );
};

export default MovieCardSkeleton;