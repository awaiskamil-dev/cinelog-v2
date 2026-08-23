import './Reviews.css';
import { useState } from 'react';

const Reviews = function({data}){
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const reviews = data.reviews.results;
  const reviewsPerPage = 2;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const visibleReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const goToPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const truncate = (text, limit = 220) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const getRecommendation = (rating) => {
    if(rating >= 7) return 'recommended';
    if(rating >= 5) return 'mixed';
    return 'not-recommended'; 
  };

  const recommendationMapping = {
    recommended: 'Recommended',
    mixed: 'Mixed Feelings',
    'not-recommended': 'Not Recommended'
  };

  return(
    <>
      <section className="reviews-section">
        <div className="reviews-header">
          <h2 className="section-heading">Reviews</h2>
          {totalPages > 1 && (
            <div className="reviews-nav">
              <button 
                className="reviews-nav__btn" 
                onClick={goToPrev} 
                disabled={currentPage === 0}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <span className="reviews-nav__count">{currentPage + 1} / {totalPages}</span>
              <button 
                className="reviews-nav__btn" 
                onClick={goToNext} 
                disabled={currentPage === totalPages - 1}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          )}
        </div>
        
        {reviews.length === 0? 
          (<p className="reviews-empty">No reviews yet for this title.</p>)
          :(
            visibleReviews.map((review) => {
              const recommendation = getRecommendation(review.author_details.rating);
              return (
                <div className="review-card" key={review.id}>
                  <div className="review-card__header">
                    <span className="review-author">{review.author}</span>
                    {review.author_details.rating !== null && 
                      <span className={`review-verdict review-verdict--${recommendation}`}>{recommendationMapping[recommendation]}</span>
                    }
                  </div>
                  <p className="review-text">
                    {truncate(review.content)}
                    {review.content.length > 220 && (
                      <span className="review-readmore" onClick={() => setSelectedReview(review.content)}>
                        Read more
                      </span>
                    )}
                  </p>
                </div>
              )
            })
          )}
        
      </section>
      {selectedReview && (
        <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="review-modal__close" 
              onClick={() => setSelectedReview(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <p className="review-text review-text--full">
              {selectedReview}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;