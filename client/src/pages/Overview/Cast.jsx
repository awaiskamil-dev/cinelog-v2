import './Cast.css';

const Cast = function(){
  return(
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
  );
};

export default Cast;