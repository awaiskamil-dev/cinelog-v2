const TvSidebar = function({data}){
  const firstAirDate = new Date(data.first_air_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const lastAirDate = data.last_air_date? new Date(data.last_air_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }): '-';

  const episodeRuntime = data.episode_run_time?.[0];

  return(
    <aside className="overview-sidebar">
      <div className="stat-block">
        <span className="stat-label">Format</span>
        <span className="stat-value">TV</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Status</span>
        <span className="stat-value">{data.status}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">First Air Date</span>
        <span className="stat-value">{firstAirDate}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Last Air Date</span>
        <span className="stat-value">{lastAirDate}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Seasons</span>
        <span className="stat-value">{data.number_of_seasons}</span>
      </div>
      <div className="stat-block">
        <span className="stat-label">Episodes</span>
        <span className="stat-value">{data.number_of_episodes}</span>
      </div>
      {episodeRuntime && (
        <div className="sidebar-item">
          <span className="sidebar-label">EPISODE RUNTIME</span>
          <span>{episodeRuntime} minutes</span>
        </div>
      )}
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

export default TvSidebar;