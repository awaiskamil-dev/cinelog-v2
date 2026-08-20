import MovieOverviewHero from './MovieOverviewHero';
import './OverviewHero.css';
import TvOverviewHero from './TvOverviewHero';

const OverviewHero = function({type, data}){
  if(type === 'movie') return <MovieOverviewHero data={data}/>

  return <TvOverviewHero data={data}/>
};

export default OverviewHero;