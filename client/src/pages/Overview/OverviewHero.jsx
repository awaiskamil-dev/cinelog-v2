import './OverviewHero.css';

const OverviewHero = function(){
  return(
    <section className="overview-hero">
      <div className="hero-backdrop">
        <img className='hero-backdrop__img' src={`https://image.tmdb.org/t/p/w1280/eZ239CUp1d6OryZEBPnO2n87gMG.jpg`}/> 
        <div className="hero-backdrop__fade"></div>
      </div>

      <div className="hero-content">
        <div className="hero-poster">
          <img className='hero-poster__img' src={`https://image.tmdb.org/t/p/w500/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg`}/>
        </div>

        <div className="hero-info">
          <h1 className="hero-title">Dune: Part Two</h1>
          <p className="hero-tagline">Long live the fighters.</p>

          <div className="hero-meta">
            <span className="hero-meta__rating">
              <i className="fa-solid fa-star"></i> 8.4
            </span>
            <span className="hero-meta__dot">•</span>
            <span>2h 46m</span>
            <span className="hero-meta__dot">•</span>
            <span>2024</span>
          </div>

          <div className="hero-genres">
            <span className="genre-tag">Science Fiction</span>
            <span className="genre-tag">Adventure</span>
            <span className="genre-tag">Drama</span>
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

export default OverviewHero;