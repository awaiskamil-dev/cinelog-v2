import './Cast.css';

const Cast = function({data}){
  const cast = data.credits.cast.slice(0, 6);

  return(
    <section className="cast-section">
      <h2 className="section-heading">Cast</h2>
      <div className="cast-grid">
        {
          cast.map((person) => {
            return(
              <div key={person.credit_id} className="cast-card">
                <img className='card-photo' src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}/>
                <span className="cast-name">{person.name}</span>
                <span className="cast-character">{person.character}</span>
              </div>
            )
          })
        }
      </div>
    </section>
  );
};

export default Cast;