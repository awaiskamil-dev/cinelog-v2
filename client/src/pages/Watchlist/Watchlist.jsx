import useUserEntries from '../../context/UserEntriesContext/useUserEntries';
import './Watchlist.css';
import WatchlistTable from './WatchlistTable';

const Watchlist = function(){
  const {userEntries} = useUserEntries();

  const completed = userEntries.filter((entry) => entry.status === 'watched');
  const planning = userEntries.filter((entry) => entry.status === 'plan-to-watch');
  const watching = userEntries.filter((entry) => entry.status === 'watching');
  const dropped = userEntries.filter((entry) => entry.status === 'dropped');
  const paused = userEntries.filter((entry) => entry.status === 'paused');

  return (
    <>
      <title>Watchlist · Cinelog</title>
      <div className='watchlist'>
        {watching.length > 0 && <WatchlistTable title={'Watching'} entries={watching}/>}
        {completed.length > 0 && <WatchlistTable title={'Completed'} entries={completed}/>}
        {paused.length > 0 && <WatchlistTable title={'Paused'} entries={paused}/>}
        {dropped.length > 0 && <WatchlistTable title={'Dropped'} entries={dropped}/>}
        {planning.length > 0 && <WatchlistTable title={'Planning'} entries={planning}/>}
      </div>
    </>
  );
};

export default Watchlist;