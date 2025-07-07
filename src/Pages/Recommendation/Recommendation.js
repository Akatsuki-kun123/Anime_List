import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../../Context/AuthContext";

import styles from "./Recommendation.module.css";

function Recommendation() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/recommendations", {
        userId: user.id,
        params: {
          page: page,
          limit: limit,
        },
      });

      if (res.data && res.data.data) {
        setRecommendations(res.data.data.results);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchRecommendations();
  }, [user, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  return (
    <div className={styles["recommendation-container"]}>
      <div className={styles["welcome-message"]}>Recommend for you</div>

      {loading ? (
        <p className={styles["loading-text"]}>Loading recommendations...</p>
      ) : (
        <>
          <div className={styles["recommendation-grid"]}>
            {recommendations.map((anime) => (
              <div key={anime.id} className={styles["anime-card"]}>
                <Link to={`/anime/${anime.id}`}>
                  <img
                    src={anime.image}
                    alt={anime.en_name}
                    className={styles["anime-image"]}
                  />
                  <div className={styles["anime-info"]}>
                    <strong>{anime.en_name}</strong>
                    <p>{anime.jp_name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className={styles["pagination-controls"]}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={styles["pagination-btn"]}
            >
              Previous
            </button>
            <span className={styles["page-indicator"]}>
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={styles["pagination-btn"]}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Recommendation;
