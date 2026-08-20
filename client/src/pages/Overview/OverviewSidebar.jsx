import MovieSidebar from './MovieSidebar';
import './OverviewSidebar.css';
import TvSidebar from './TvSidebar';

const OverviewSidebar = function({type, data}){
  if(type === 'movie') return <MovieSidebar data={data}/>

  return <TvSidebar data={data}/>
};

export default OverviewSidebar;