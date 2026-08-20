import './OverviewSidebar.css';

const OverviewSidebar = function(){
  return(
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
  );
};

export default OverviewSidebar;