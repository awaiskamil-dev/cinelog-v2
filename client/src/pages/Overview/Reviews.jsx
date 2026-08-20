import './Reviews.css';

const Reviews = function(){
  return(
    <section className="reviews-section">
      <h2 className="section-heading">Reviews</h2>

      <div className="review-card">
        <div className="review-card__header">
          <span className="review-author">skywalker_j</span>
          <span className="review-verdict review-verdict--recommended">Recommended</span>
        </div>
        <p className="review-text">
          A rare sequel that actually surpasses the original. The scale is
          staggering, the sandworm sequence alone is worth the price of
          admission, and Chalamet finally gets to play the darker turn the
          first film set up.
        </p>
      </div>

      <div className="review-card">
        <div className="review-card__header">
          <span className="review-author">critical_reeler</span>
          <span className="review-verdict review-verdict--mixed">Mixed Feelings</span>
        </div>
        <p className="review-text">
          Visually unimpeachable, but the pacing sags in the back half and
          a couple of the political threads from the book get flattened
          for time. Still a strong watch, just not the masterpiece some
          are calling it.
        </p>
      </div>

    </section>
  );
};

export default Reviews;