import useUserEntries from '../../context/UserEntriesContext/useUserEntries';
import './Watchlist.css';
import WatchlistTable from './WatchlistTable';

const Watchlist = function(){
  const {userEntries} = useUserEntries();

  const completed = userEntries.filter((entry) => entry.status === 'watched');
  const planning = userEntries.filter((entry) => entry.status === 'plan-to-watch');

  return (
    <div className='watchlist'>
      <WatchlistTable title={'Completed'} entries={completed}/>
      <WatchlistTable title={'Planning'} entries={planning}/>
    </div>
  );
};

export default Watchlist;