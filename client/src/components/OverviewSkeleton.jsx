import './OverviewSkeleton.css';

const OverviewSkeleton = function () {
  return (
    <main className="overview-page">
      <section className="overview-hero">
        <div className="hero-backdrop overview-skeleton-backdrop"></div>

        <div className="hero-content">
          <div className="hero-poster overview-skeleton-block"></div>

          <div className="hero-info">
            <div className="overview-skeleton-title overview-skeleton-block"></div>

            <div className="overview-skeleton-tagline overview-skeleton-block"></div>

            <div className="overview-skeleton-meta">
              <div className="overview-skeleton-meta-item overview-skeleton-block"></div>
              <div className="overview-skeleton-meta-item overview-skeleton-block"></div>
              <div className="overview-skeleton-meta-item overview-skeleton-block"></div>
            </div>

            <div className="overview-skeleton-genres">
              <div className="overview-skeleton-genre overview-skeleton-block"></div>
              <div className="overview-skeleton-genre overview-skeleton-block"></div>
              <div className="overview-skeleton-genre overview-skeleton-block"></div>
            </div>

            <div className="overview-skeleton-actions">
              <div className="overview-skeleton-action overview-skeleton-block"></div>
              <div className="overview-skeleton-action-small overview-skeleton-block"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="overview-summary">
        <div className="overview-skeleton-heading overview-skeleton-block"></div>

        <div className="overview-skeleton-text overview-skeleton-block"></div>
        <div className="overview-skeleton-text overview-skeleton-block"></div>
        <div className="overview-skeleton-text short overview-skeleton-block"></div>
      </section>

      <div className="overview-body">
        <aside className="overview-sidebar">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="overview-skeleton-stat" key={index}>
              <div className="overview-skeleton-label overview-skeleton-block"></div>
              <div className="overview-skeleton-value overview-skeleton-block"></div>
            </div>
          ))}
        </aside>

        <div className="overview-main">
          <section>
            <div className="overview-skeleton-heading overview-skeleton-block"></div>

            <div className="cast-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="cast-card" key={index}>
                  <div className="overview-skeleton-cast-photo overview-skeleton-block"></div>
                  <div className="overview-skeleton-cast-name overview-skeleton-block"></div>
                  <div className="overview-skeleton-cast-character overview-skeleton-block"></div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="overview-skeleton-heading overview-skeleton-block"></div>

            {Array.from({ length: 2 }).map((_, index) => (
              <div className="overview-skeleton-review" key={index}>
                <div className="overview-skeleton-review-header">
                  <div className="overview-skeleton-review-author overview-skeleton-block"></div>
                  <div className="overview-skeleton-review-tag overview-skeleton-block"></div>
                </div>

                <div className="overview-skeleton-review-line overview-skeleton-block"></div>
                <div className="overview-skeleton-review-line overview-skeleton-block"></div>
                <div className="overview-skeleton-review-line short overview-skeleton-block"></div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
};

export default OverviewSkeleton;