import './Overview.css';

const Overview = function(){
  return(
    <main className="overview-page">

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
  
      <section className="overview-summary">
        <h2 className="section-heading">Overview</h2>
        <p className="overview-text">
          Paul Atreides unites with Chani and the Fremen while on a warpath of
          revenge against the conspirators who destroyed his family. Facing a
          choice between the love of his life and the fate of the known
          universe, he endeavors to prevent a terrible future only he can foresee.
        </p>
      </section>
  
      <div className="overview-body">
  
        <aside className="overview-sidebar">
          <div className="stat-block">
            <span className="stat-label">Format</span>
            <span className="stat-value">Movie</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Status</span>
            <span className="stat-value">Released</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Release Date</span>
            <span className="stat-value">Mar 1, 2024</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Runtime</span>
            <span className="stat-value">166 minutes</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Original Language</span>
            <span className="stat-value">English</span>
          </div>
          <div className="stat-block">
            <span className="stat-label">Genres</span>
            <div className="stat-genre-list">
              <span className="genre-tag genre-tag--sm">Science Fiction</span>
              <span className="genre-tag genre-tag--sm">Adventure</span>
              <span className="genre-tag genre-tag--sm">Drama</span>
            </div>
          </div>
        </aside>
  
        <div className="overview-main">
  
          <section className="cast-section">
            <h2 className="section-heading">Cast</h2>
            <div className="cast-grid">
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Timothée Chalamet</span>
                <span className="cast-character">Paul Atreides</span>
              </div>
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Zendaya</span>
                <span className="cast-character">Chani</span>
              </div>
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Rebecca Ferguson</span>
                <span className="cast-character">Lady Jessica</span>
              </div>
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Josh Brolin</span>
                <span className="cast-character">Gurney Halleck</span>
              </div>
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Austin Butler</span>
                <span className="cast-character">Feyd-Rautha</span>
              </div>
  
              <div className="cast-card">
                <div className="cast-photo"></div>
                <span className="cast-name">Florence Pugh</span>
                <span className="cast-character">Princess Irulan</span>
              </div>
  
            </div>
          </section>
  
          <section className="reviews-section">
            <h2 className="section-heading">Reviews</h2>
  
            <div className="review-card">
              <div className="review-card__header">
                <span className="review-author">skywalker_j</span>
                <span className="review-verdict review-verdict--recommended">Recommended</span>
              </div>
              <p className="review-text">
                A rare sequel that actually surpasses the original. The scale is
                staggering, the sandworm sequence alone is worth the price of
                admission, and Chalamet finally gets to play the darker turn the
                first film set up.
              </p>
            </div>
  
            <div className="review-card">
              <div className="review-card__header">
                <span className="review-author">critical_reeler</span>
                <span className="review-verdict review-verdict--mixed">Mixed Feelings</span>
              </div>
              <p className="review-text">
                Visually unimpeachable, but the pacing sags in the back half and
                a couple of the political threads from the book get flattened
                for time. Still a strong watch, just not the masterpiece some
                are calling it.
              </p>
            </div>
  
          </section>
  
        </div>
      </div>
  
    </main>
  );
};

export default Overview;