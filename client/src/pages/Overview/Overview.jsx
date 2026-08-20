import './Overview.css';
import './shared.css';
import OverviewHero from './OverviewHero';
import OverviewSummary from './OverviewSummary';
import OverviewSidebar from './OverviewSidebar';
import Cast from './Cast';
import Reviews from './Reviews';

const Overview = function(){
  return(
    <main className="overview-page">
      <OverviewHero/>
      <OverviewSummary/>
  
      <div className="overview-body">
        <OverviewSidebar/>
  
        <div className="overview-main">
          <Cast/>
          <Reviews/>
        </div>
      </div>
    </main>
  );
};

export default Overview;