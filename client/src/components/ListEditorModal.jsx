import './ListEditorModal.css';
import { useState } from 'react';
import useListEditor from '../context/ListEditorContext/useListEditor';
import useUserEntries from '../context/UserEntriesContext/useUserEntries';
import API_URL from '../config';
import useToast from '../context/ToastContext/useToast';

function ListEditorModal() {
  const { currentMovie, currentEntry, closeEditor } = useListEditor();

  const [status, setStatus] = useState(currentEntry?.status || 'plan-to-watch');
  const [rating, setRating] = useState(currentEntry?.rating || '');
  const [review, setReview] = useState(currentEntry?.review || '');

  const {userEntries, setUserEntries} = useUserEntries();
  const {showToast} = useToast();

  const displayTitle = currentMovie
    ? (currentMovie.media_type === 'movie' ? currentMovie.title : currentMovie.name)
    : currentEntry?.title;

  const displayPoster = currentMovie?.poster_path || currentEntry?.posterPath;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const year = currentMovie? (currentMovie.media_type === 'movie'
      ? Number(currentMovie.release_date?.slice(0, 4))
      : Number(currentMovie.first_air_date?.slice(0, 4))) : '';

    const normalizedRating = rating === '' ? null : rating;
    
    const previousEntries = userEntries;

    if (currentEntry) {
      setUserEntries(prev =>
        prev.map(entry =>
          entry.tmdbId === currentEntry.tmdbId
            ? { ...entry, status, rating: normalizedRating, review}
            : entry
        )
      );
    } else if(currentMovie){
      setUserEntries(prev => [
        ...prev,
        {
          title: currentMovie.media_type === 'movie' ? currentMovie.title : currentMovie.name,
          tmdbId: currentMovie.id,
          posterPath: currentMovie.poster_path,
          releaseDate: year,
          mediaType: currentMovie.media_type,
          status: status,
          rating: normalizedRating,
        }
      ]);
    }

    try {
      const toastStatus = {
        'plan-to-watch': 'planning',
        watched: 'completed',
        watching: 'watching',
        dropped: 'dropped',
        paused: 'paused'
      };

      if(currentEntry){
        const res = await fetch(`${API_URL}/entries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            tmdbId: currentEntry.tmdbId,
            title: currentEntry.title,
            status,
            rating: rating === '' ? null : rating,
            review
          })
        });
        if (!res.ok) {
          throw new Error('Failed to save entry');
        }

        closeEditor();
        showToast(`${currentEntry.title} entry updated`, 'success');
      }
      else if(currentMovie){
        const title = currentMovie.media_type === 'movie' ? currentMovie.title : currentMovie.name;
        const res = await fetch(`${API_URL}/entries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            title,
            tmdbId: currentMovie.id,
            posterPath: currentMovie.poster_path,
            releaseDate: year,
            mediaType: currentMovie.media_type,
            status: status,
            rating: rating === '' ? null : rating,
          })
        });
        if (!res.ok) {
          throw new Error('Failed to save entry');
        }

        closeEditor();
        showToast(`${title} added to ${toastStatus[status]} list`, 'success');
      }
      else {
        showToast('Something went wrong — no movie data available', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
      setUserEntries(previousEntries);
    }
  };

  const handleDelete = async () => {
    if (!currentEntry) return; // nothing to delete if this is a new, unsaved entry
    
    const previousEntries = userEntries;

    setUserEntries(prev =>
      prev.filter(entry => entry.tmdbId !== currentEntry.tmdbId)
    );

    try {
      const res = await fetch(`${API_URL}/entries/${currentEntry.tmdbId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete entry');

      showToast(`${currentEntry.title} removed from ${currentEntry.status}`);
      closeEditor();
    } catch (err) {
      showToast(err.message, 'error');
      setUserEntries(previousEntries);
    }
  };

  return (
    <div className="editor-overlay" onClick={closeEditor}>
      <div className="editor-modal" onClick={(e) => e.stopPropagation()}>
        <button className="editor-close" onClick={closeEditor}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="editor-header">
          <img
            className="editor-poster"
            src={`https://image.tmdb.org/t/p/w200${displayPoster}`}
            alt={displayTitle}
          />
          <h3 className="editor-title">{displayTitle}</h3>
        </div>

        <form className="editor-body" onSubmit={handleSubmit}>
          <div className="editor-field">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="plan-to-watch">Plan to Watch</option>
              <option value="watching">Watching</option>
              <option value="watched">Completed</option>
              <option value="paused">Paused</option>
              <option value="dropped">Dropped</option>
            </select>
            <i className="fa-solid fa-angle-down"/>
          </div>

          <div className="editor-field">
            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={rating || ''}
              placeholder='-'
              onChange={(e) => setRating((e.target.value === '' ? '' : Number(e.target.value)))}
            />
          </div>

          <div className="editor-field editor-field--full">
            <label>Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you think?"
            />
          </div>

          <div className="editor-actions">
            {
              currentEntry? 
              (
                <button type="button" onClick={handleDelete} className="editor-btn-secondary">
                  Delete
                </button>)
              :(
                <button type="button" onClick={closeEditor} className="editor-btn-secondary">
                  Cancel
                </button>
              )
            }
            <button type="submit" className="editor-btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListEditorModal;