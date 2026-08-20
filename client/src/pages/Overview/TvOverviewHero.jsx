const TvOverviewHero = function({data}){
  const rating = data.vote_average > 0 ? data.vote_average.toFixed(1) : '-';
  const startYear = data.first_air_date?.slice(0, 4);
  const endYear = data.last_air_date?.slice(0, 4);

  const duration = endYear
    ? `${startYear} - ${endYear}`
    : `${startYear} - Present`;

  const genres = data.genres.slice(0, 3);

  return(
    <section className="overview-hero">
      <div className="hero-backdrop">
        <img className='hero-backdrop__img' src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}/> 
        <div className="hero-backdrop__fade"></div>
      </div>

      <div className="hero-content">
        <div className="hero-poster">
          <img className='hero-poster__img' src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}/>
        </div>

        <div className="hero-info">
          <h1 className="hero-title">{data.name}</h1>
          <p className="hero-tagline">{data.tagline}</p>

          <div className="hero-meta">
            <span className="hero-meta__rating">
              <i className="fa-solid fa-star"></i> {rating}
            </span>
            <span className="hero-meta__dot">•</span>
            <span>{`${data.number_of_seasons} Seasons`}</span>
            <span className="hero-meta__dot">•</span>
            <span>{duration}</span>
          </div>

          <div className="hero-genres">
            {genres.map((genre) => {
              return (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              )
            })}
          </div>

          <div className="hero-actions">
            <div className="status-select-wrapper">
              <select className="status-select">
                <option value="">Add to List</option>
                <option value="watching">Watching</option>
                <option value="watched">Completed</option>
                <option value="plan-to-watch">Planning</option>
                <option value="list-editor">Open List Editor</option>
              </select>
              <i className="fa-solid fa-angle-down status-select__chevron"></i>
            </div>

            <button className="favorite-btn" aria-label="Add to favorites">
              <i className="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvOverviewHero;