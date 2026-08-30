const WatchlistSkeletonRow = function(){
  return (
    <tr className="watchlist-skeleton-row">
      <td className="title-row">
        <div className="skeleton-thumb"></div>
        <div className="skeleton-entry-title"></div>
      </td>

      <td className="col-stats">
        <div className="skeleton-stat"></div>
      </td>

      <td className="col-stats">
        <div className="skeleton-stat"></div>
      </td>

      <td className="col-stats">
        <div className="skeleton-stat"></div>
      </td>

      <div className="mobile-metadata skeleton-mobile-metadata">
        <div className="skeleton-mobile-stat skeleton-mobile-rating"></div>
        <div className="skeleton-mobile-stat skeleton-mobile-stat-wide"></div>
      </div>
    </tr>
  );
};

export default WatchlistSkeletonRow;