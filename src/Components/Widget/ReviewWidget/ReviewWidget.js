import { Link } from "react-router-dom";

import "./ReviewWidget.css";

function ReviewWidget({ reviews }) {
  return (
    <div className="review-list">
      <div className="review-label">Recent Reviews</div>

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <img
              src={review.anime.image}
              alt={review.id}
              className="review-thumbnail"
            />

            <div className="review-content">
              <div className="review-header">
                <div className="review-title">{review.anime.jp_name}</div>
                <div className="review-score">
                  Overall Rating: {review.rating}
                </div>
              </div>

              <div className="review-text">
                {review.content?.length > 300
                  ? review.content.slice(0, 300) + "... "
                  : review.content}
                <span className="read-more">(read more)</span>
              </div>

              <Link to={`/profile/${review.user.id}`} className="review-meta">
                by <span className="review-user">{review.user.username}</span>
                <span className="review-time">{review.created_at}</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div style={{ color: "white" }}>No anime found.</div>
      )}
    </div>
  );
}

export default ReviewWidget;
