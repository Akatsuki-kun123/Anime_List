import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AddReview.module.css";
import { AuthContext } from "../../Context/AuthContext";

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [anime, setAnime] = useState(null);
  const [userAnimeEntry, setUserAnimeEntry] = useState(null);
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Recommended");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.post("/api/getAnimeDetailOnly", {
          id,
          userId: user.id,
        });
        setAnime(res.data.data);
        setUserAnimeEntry(res.data.inList);
        setRating(res.data.inList?.score || 0);
      } catch (error) {
        console.error("Error fetching anime detail:", error);
      }
    };

    fetchAnime();
  }, [id, user]);

  const handleSubmit = async () => {
    if (!content || !rating || !tag) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await axios.post("/api/addReview", {
        userId: user.id,
        animeId: id,
        content,
        rating,
        tag,
      });

      if (res.data.success) {
        toast.success("Review submitted successfully");
        setTimeout(() => {
          navigate(`/anime/${id}?section=review`);
        }, 1500);
      } else {
        alert(res.data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  if (!anime || !userAnimeEntry) return <div>Loading...</div>;

  if (userAnimeEntry.episodes_watched <= 3) {
    return (
      <div className={styles["not-allowed"]}>
        You cannot write a review until you have watched at least 3 episodes.
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <ToastContainer />

      <h2 className={styles["header"]}>
        Write a Review for {anime.en_name || anime.jp_name}
      </h2>

      <div className={styles["anime-info"]}>
        <img
          src={anime.image}
          alt={anime.en_name || anime.jp_name}
          className={styles["anime-img"]}
        />
        <div>
          <h3>{anime.en_name || anime.jp_name}</h3>
          <p>
            Episodes watched: {userAnimeEntry.episodes_watched}/
            {anime.episodes || "?"}
          </p>
        </div>
      </div>

      <div className={styles["form-section"]}>
        <div className={styles["form-group"]}>
          <label className={styles["label"]}>
            Would you recommend this?{" "}
            <span className={styles["required"]}>(required)</span>
          </label>
          <div className={styles["tag-options"]}>
            <label>
              <input
                type="radio"
                name="tag"
                value="Recommended"
                checked={tag === "Recommended"}
                onChange={() => setTag("Recommended")}
              />
              Recommended
            </label>
            <label>
              <input
                type="radio"
                name="tag"
                value="Mixed Feelings"
                checked={tag === "Mixed Feelings"}
                onChange={() => setTag("Mixed Feelings")}
              />
              Mixed Feelings
            </label>
            <label>
              <input
                type="radio"
                name="tag"
                value="Not Recommended"
                checked={tag === "Not Recommended"}
                onChange={() => setTag("Not Recommended")}
              />
              Not Recommended
            </label>
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["label"]}>
            Review Text <span className={styles["required"]}>(required)</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className={styles["textarea"]}
          ></textarea>
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["label"]}>
            Overall Rating{" "}
            <span className={styles["required"]}>(required)</span>
          </label>
          <div className={styles["rating-buttons"]}>
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i + 1}
                type="button"
                className={`${styles["rating-btn"]} ${
                  rating === i + 1 ? styles["active"] : ""
                }`}
                onClick={() => setRating(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className={styles["button-group"]}>
          <button onClick={handleSubmit} className={styles["submit-btn"]}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
