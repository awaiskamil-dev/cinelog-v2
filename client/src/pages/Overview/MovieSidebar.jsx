const MovieSidebar = function({data}){
  const releaseDate = new Date(data.release_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return(
    <aside className="overview-sidebar">
      <div className="stat-block">
        <span className="stat-label">Format</span>
        <span className="stat-value">Movie</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Status</span>
        <span className="stat-value">{data.status}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Release Date</span>
        <span className="stat-value">{releaseDate}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Runtime</span>
        <span className="stat-value">{data.runtime} minutes</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Original Language</span>
        <span className="stat-value">{data.spoken_languages[0].name}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Genres</span>
        <div className="stat-genre-list">
          {
            data.genres.map((genre) => {
              return(
                <span key={genre.id} className="genre-tag genre-tag--sm">{genre.name}</span>
              )
            })
          }
        </div>
      </div>
    </aside>
  );
};

export default MovieSidebar;