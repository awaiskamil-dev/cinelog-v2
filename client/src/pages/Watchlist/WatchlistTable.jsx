import { useNavigate } from 'react-router';
import './WatchlistTable.css';
import useListEditor from '../../context/ListEditorContext/useListEditor';

const WatchlistTable = function({title, entries}){
  const navigate = useNavigate();
  const {openEditor} = useListEditor();
  
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
              const rating = entry.rating ? entry.rating : '-';
              return(
                <tr key={entry.tmdbId}>
                  <td className="title-row">
                    <div className="poster-popup">
                      <img src={`https://image.tmdb.org/t/p/w500${entry.posterPath}`} alt="Movie Poster Popup"/>
                    </div>
                    <div className='poster-container'>
                       <img className="poster-thumb" src={`https://image.tmdb.org/t/p/w500${entry.posterPath}`} 
                        alt="Movie Poster" onClick={() => openEditor(entry)}/>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <span className='entry-title' onClick={() => navigate(`/${entry.mediaType}/${entry.tmdbId}`)}>{entry.title}</span>
                  </td>
                  <td className="col-stats">{rating}</td>
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