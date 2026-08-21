import { useEffect, useState } from "react";
import API_URL from "../../config"
import UserEntriesContext from "./UserEntriesContext";
import useAuth from "../AuthContext/useAuth";
import useToast from "../ToastContext/useToast";

const UserEntriesProvider = ({children}) => {
  const [userEntries, setUserEntries] = useState([]);
  const {user} = useAuth();
  const {showToast} = useToast();

  useEffect(() => {
    if(!user){
      setUserEntries([]);
      return;
    }
    const fetchUserEntries = async () => {
      try{
        const response = await fetch(`${API_URL}/entries/me`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch entries');
        setUserEntries(data.entries);
      }catch(err){
        console.log(err);
      }
    };
    fetchUserEntries();
  }, [user]);

  const handleIconChange = async (movie, clickedStatus) => {
    if(!user){
      showToast('Please log in to save movies', 'error');
      return;
    }

    const year = movie.media_type === 'movie'
      ? Number(movie.release_date?.slice(0, 4))
      : Number(movie.first_air_date?.slice(0, 4));

    const previousEntries = userEntries;

    const existingEntry = userEntries.find(
      entry => entry.tmdbId === movie.id
    );

    const isRemoving = existingEntry?.status === clickedStatus;

    if (isRemoving) {
      setUserEntries(prev =>
        prev.filter(entry => entry.tmdbId !== movie.id)
      );
    } else if (existingEntry) {
      setUserEntries(prev =>
        prev.map(entry =>
          entry.tmdbId === movie.id
            ? { ...entry, status: clickedStatus }
            : entry
        )
      );
    } else {
      setUserEntries(prev => [
        ...prev,
        {
          title: movie.media_type === 'movie' ? movie.title : movie.name,
          tmdbId: movie.id,
          posterPath: movie.poster_path,
          releaseDate: year,
          mediaType: movie.media_type,
          status: clickedStatus
        }
      ]);
    }

    try {
      const title =
          movie.media_type === 'movie' ? movie.title : movie.name;
      const toastStatus = clickedStatus === 'watched'? 'completed' : 'planning';
      

      if (isRemoving) {
        const res = await fetch(`${API_URL}/entries/${movie.id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to remove entry');
        }
        
        showToast(`${title} removed from ${toastStatus} list`, 'success');
      } else {
        const res = await fetch(`${API_URL}/entries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            title,
            tmdbId: movie.id,
            posterPath: movie.poster_path,
            releaseDate: year,
            mediaType: movie.media_type,
            status: clickedStatus
          })
        });

        if (!res.ok) {
          throw new Error('Failed to save entry');
        }

        showToast(`${title} added to ${toastStatus} list`, 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
      setUserEntries(previousEntries);
    }
  };

  const handleStatusChange = async (movie, status) => {
    if(!user){
      showToast('Please log in to save movies', 'error');
      return;
    }

    const tmdbId = movie.id || movie.tmdbId;
    const title = movie.title || movie.name;
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    const year = mediaType === 'movie'
      ? Number(movie.release_date?.slice(0, 4))
      : Number(movie.first_air_date?.slice(0, 4));
    
      const toastStatus = {
      'plan-to-watch': 'planning',
      watched: 'completed',
      paused: 'paused',
      watching: 'watching',
      dropped: 'dropped'
    };

    const previousEntries = userEntries;
    const existingEntry = userEntries.find((entry) => entry.tmdbId === tmdbId);

    if(existingEntry){
      setUserEntries(prev =>
        prev.map(entry =>
          entry.tmdbId === tmdbId
            ? { ...entry, status}
            : entry
        ));
    }
    else{
      setUserEntries(prev => [
        ...prev,
        {
          title,
          tmdbId,
          posterPath: movie.poster_path,
          releaseDate: year,
          mediaType: mediaType,
          status
        }
      ])
    }

    try{
      if(existingEntry){
        const res = await fetch(`${API_URL}/entries`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            title: existingEntry.title,
            tmdbId,
            status: status
          })
        });

        if(!res.ok){
          throw new Error('Failed to save entry');
        }
        showToast(`${existingEntry.title} added to ${toastStatus[status]} list`, 'success');
      }
      else{
        const res = await fetch(`${API_URL}/entries`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            title,
            tmdbId,
            posterPath: movie.poster_path,
            releaseDate: year,
            mediaType: mediaType,
            status: status
          })
        });
        if(!res.ok){
          throw new Error('Failed to save entry');
        }
        showToast(`${title} added to ${toastStatus[status]} list`, 'success');
      }
      

    }catch(err){
      showToast(err.message, 'error');
      setUserEntries(previousEntries);
    }
  };

  const value = {userEntries, setUserEntries, handleIconChange, handleStatusChange};
  
  return(
    <UserEntriesContext.Provider value={value}>
      {children}
    </UserEntriesContext.Provider>
  );
};

export default UserEntriesProvider;