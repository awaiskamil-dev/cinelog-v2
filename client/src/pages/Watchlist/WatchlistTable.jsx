import { useNavigate } from 'react-router';
import './WatchlistTable.css';

const WatchlistTable = function({title, entries}){
  const navigate = useNavigate();

  return(
    <div className="watchlist-table-section">
      <h2 className="watchlist-heading">{title}</h2>
      <table>
        <thead>
          <tr className="heading-row">
            <th className="title-heading">Title</th>
            <th className="col-stats">Rating</th>
            <th className="col-stats">Year</th>
            <th className="col-stats">Type</th>
          </tr>
        </thead>
        <tbody>
          {
            entries.map((entry) => {
              const type = entry.mediaType === 'movie' ? 'Movie' : 'TV';
              return(
                <tr key={entry.tmdbId}>
                  <td className="title-row">
                    <div className="poster-popup">
                      <img src={`https://image.tmdb.org/t/p/w500${entry.posterPath}`} alt="Movie Poster Popup"/>
                    </div>
                    <img className="poster-thumb" src={`https://image.tmdb.org/t/p/w500${entry.posterPath}`} alt="Movie Poster"/>
                    <span className='entry-title' onClick={() => navigate(`/${entry.mediaType}/${entry.tmdbId}`)}>{entry.title}</span>
                  </td>
                  <td className="col-stats">-</td>
                  <td className="col-stats">{entry.releaseDate}</td>
                  <td className="col-stats">{type}</td>
                </tr>
            );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistTable;