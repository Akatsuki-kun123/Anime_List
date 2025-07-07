import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import axios from "axios";

import styles from "./UserReviews.module.css";

function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedStates, setExpandedStates] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [loading, setLoading] = useState(true);

  const limit = 20;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/reviews", {
          page: pageParam,
          limit: limit,
        });
        if (res.data.success) {
          setReviews(res.data.data);
          setTotalPages(res.data.totalPages);
          const initialStates = {};
          res.data.data.forEach((review) => {
            initialStates[review.id] = false;
          });
          setExpandedStates(initialStates);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [pageParam]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  const toggleExpand = (id) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFormattedContent = (text) => {
    const sentences = text.split(/(?<=\.)\s+/);
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
      paragraphs.push(sentences.slice(i, i + 3).join(" "));
    }
    return paragraphs;
  };

  if (loading) return <p className={styles["loading"]}>Loading reviews...</p>;

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>All Reviews</div>

      {reviews.length === 0 && <p>No reviews found.</p>}

      <div className={styles["reviewList"]}>
        {reviews.map((review) => {
          let tagColor = "#52c41a";
          if (review.tag === "Recommended") {
            tagColor = "#52c41a";
          } else if (review.tag === "Mixed Feelings") {
            tagColor = "#faad14";
          } else if (review.tag === "Not Recommended") {
            tagColor = "#ff4d4f";
          }

          const isExpanded = expandedStates[review.id];
          const shouldTruncate = review.content.length > 500 && !isExpanded;

          return (
            <div key={review.id} className={styles["reviewCard"]}>
              <div className={styles["col1"]}>
                <img
                  src={review.user.image}
                  alt={review.user.username}
                  className={styles["avatar"]}
                />
                <Link
                  to={`/profile/${review.user.id}`}
                  className={styles["username"]}
                >
                  {review.user.username}
                </Link>
                <p className={styles["date"]}>
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className={styles["col2"]}>
                <div
                  className={styles["tag"]}
                  style={{ backgroundColor: tagColor }}
                >
                  {review.tag}
                </div>

                <div className={styles["content"]}>
                  {isExpanded
                    ? getFormattedContent(review.content).map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))
                    : review.content.slice(0, 500) +
                      (shouldTruncate ? "..." : "")}
                </div>

                {review.content.length > 500 && (
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className={styles["readMoreButton"]}
                  >
                    {isExpanded ? "Show Less" : "Read more"}
                  </button>
                )}

                <p className={styles["score"]}>Score: {review.rating}/10</p>
              </div>

              <div className={styles["col3"]}>
                <Link
                  to={`/anime/${review.anime.id}`}
                  className={styles["animeTitle"]}
                >
                  {review.anime.en_name || review.anime.jp_name}
                </Link>
                <img
                  src={review.anime.image}
                  alt={review.anime.en_name || review.anime.jp_name}
                  className={styles["animeImage"]}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["paginationContainer"]}>
        <button
          onClick={() => handlePageChange(pageParam - 1)}
          disabled={pageParam <= 1}
          className={styles["pageButton"]}
        >
          Previous
        </button>
        <span className={styles["pageInfo"]}>
          Page {pageParam} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageParam + 1)}
          disabled={pageParam >= totalPages}
          className={styles["pageButton"]}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserReviews;
