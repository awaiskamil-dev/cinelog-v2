import './Overview.css';
import './shared.css';
import OverviewHero from './OverviewHero';
import OverviewSummary from './OverviewSummary';
import OverviewSidebar from './OverviewSidebar';
import Cast from './Cast';
import Reviews from './Reviews';

const Overview = function({type, data}){
  return(
    <>
      <title>{`${type === 'movie'? (data.title) : (data.name)} · Cinelog`}</title>
      <main className="overview-page">
        <OverviewHero type={type} data={data}/>
        <OverviewSummary data={data}/>
    
        <div className="overview-body">
          <OverviewSidebar type={type} data={data}/>
    
          <div className="overview-main">
            <Cast data={data}/>
            <Reviews data={data}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Overview;