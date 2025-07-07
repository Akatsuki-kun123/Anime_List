import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./AnimeReviews.module.css";

const AnimeReviews = ({ reviews }) => {
  return (
    <div className={styles["reviewsContainer"]}>
      {reviews.length == 0 ? (
        <p className={styles["emptyText"]}>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      )}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [showMore, setShowMore] = useState(false);
  const maxLength = 300;

  const splitContentBySentences = (text, sentencesPerParagraph = 3) => {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
      paragraphs.push(
        sentences
          .slice(i, i + sentencesPerParagraph)
          .join(" ")
          .trim()
      );
    }

    return paragraphs;
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const contentToShow =
    showMore || review.content.length <= maxLength
      ? review.content
      : review.content.slice(0, maxLength) + "...";

  const paragraphs = splitContentBySentences(contentToShow, 3);

  return (
    <div className={styles["reviewCard"]}>
      <div className={styles["header"]}>
        <div className={styles["userInfoLeft"]}>
          <img
            src={review.user.image || "https://i.pravatar.cc/150"}
            alt={review.username}
            className={styles["avatar"]}
          />

          <div className={styles["nameAndRating"]}>
            <Link
              to={`/profile/${review.user.id}`}
              className={styles["username"]}
            >
              {review.user.username}
            </Link>
            <div className={styles["rating"]}>
              (Reviewer rating: {review.rating}/10)
            </div>
          </div>
        </div>

        <div className={styles["userInfoRight"]}>
          <span
            className={`${styles["badge"]} ${
              review.tag == "Recommended"
                ? styles["recommended"]
                : review.tag == "Not Recommended"
                ? styles["notRecommended"]
                : review.tag == "Mixed Feelings"
                ? styles["mixed"]
                : ""
            }`}
          >
            {review.tag}
          </span>
        </div>
      </div>

      <div className={styles["content"]}>
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      <div className={styles["footer"]}>
        <p className={styles["date"]}>
          {new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {review.content.length > maxLength && (
          <button onClick={toggleShowMore} className={styles["showMoreBtn"]}>
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimeReviews;
