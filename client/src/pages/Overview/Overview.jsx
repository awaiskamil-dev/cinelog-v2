import './Overview.css';
import './shared.css';
import OverviewHero from './OverviewHero';
import OverviewSummary from './OverviewSummary';
import OverviewSidebar from './OverviewSidebar';
import Cast from './Cast';
import Reviews from './Reviews';

const Overview = function({type, data}){
  return(
    <main className="overview-page">
      <OverviewHero type={type} data={data}/>
      <OverviewSummary data={data}/>
  
      <div className="overview-body">
        <OverviewSidebar type={type} data={data}/>
  
        <div className="overview-main">
          <Cast data={data}/>
          <Reviews/>
        </div>
      </div>
    </main>
  );
};

export default Overview;