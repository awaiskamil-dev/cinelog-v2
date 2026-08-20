import './OverviewSummary.css';

const OverviewSummary = function({data}){
  return(
    <section className="overview-summary">
      <h2 className="section-heading">Overview</h2>
      <p className="overview-text">{data.overview}</p>
    </section>
  );
};

export default OverviewSummary;