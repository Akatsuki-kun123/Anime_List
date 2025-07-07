import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./AnimeCard.module.css";

function AnimeCard({ anime }) {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles["anime-card"]}>
      <h3 className={styles["title"]}>{anime.jp_name}</h3>
      <h4 className={styles["subtitle"]}>{anime.en_name}</h4>

      <div className={styles["info-line"]}>
        <span>TV, {anime.aired}</span>
        <span>• {anime.episodes} eps</span>
        <span>• {anime.status}</span>
      </div>

      <div className={styles["tags"]}>
        {anime.genres?.map((g) => (
          <span key={g.name} className={styles["tag"]}>
            {g.name}
          </span>
        ))}
      </div>

      <div className={styles["image-desc-wrapper"]}>
        <img
          src={anime.image}
          alt={anime.jp_name}
          className={styles["anime-image"]}
        />
        <p className={styles["description"]}>{anime.description}</p>
      </div>

      <div className={styles["studio-line"]}>
        <strong>Studio:</strong> {anime.studios?.map((s) => s.name).join(", ")}
      </div>

      <div className={styles["footer"]}>
        <span>⭐ {anime.score.toFixed(2)}</span>
        <Link to={`/anime/${anime.id}`} className={styles["back-button"]}>
          Detail
        </Link>
      </div>
    </div>
  );
}

export default AnimeCard;
