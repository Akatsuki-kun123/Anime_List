import { Link } from "react-router-dom";

import styles from "./RankingList.module.css";

const statusMap = {
  1: "Watching",
  2: "Completed",
  3: "On Hold",
  4: "Dropped",
  0: "Plan to Watch",
};

function RankingList({ list, page, limit }) {
  return (
    <div className={styles["top-table"]}>
      <div className={styles["table-header"]}>
        <div className={styles["col-rank"]}>Rank</div>
        <div className={styles["col-title"]}>Title</div>
        <div className={styles["col-score"]}>Score</div>
        <div className={styles["col-your-score"]}>Your Score</div>
        <div className={styles["col-status"]}>Status</div>
      </div>

      {list.map((anime, index) => {
        return (
          <Link to={`/anime/${anime.id}`} className={styles["anime-link"]}>
            <div className={styles["table-row"]} key={anime.id}>
              <div className={styles["col-rank"]}>
                {index + 1 + (page - 1) * limit}
              </div>

              <div className={styles["col-title"]}>
                <img
                  src={anime.image}
                  alt={anime.id}
                  className={styles["anime-thumbnail"]}
                />

                <div className={styles["anime-details"]}>
                  <div className={styles["anime-title"]}>{anime.jp_name}</div>

                  <div className={styles["anime-sub"]}>
                    {anime.type} ({anime.episodes} eps) aired
                  </div>

                  <div className={styles["anime-sub"]}>{anime.aired}</div>
                </div>
              </div>

              <div className={styles["col-score"]}>⭐ {anime.score.toFixed(2)}</div>

              <div className={styles["col-your-score"]}>
                {anime.userScore ? anime.userScore : "N/A"}
              </div>

              <div className={styles["col-status"]}>
                <button className={styles["add-btn"]}>
                  {statusMap[anime.userStatus]
                    ? statusMap[anime.userStatus]
                    : "Add to My List"}
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default RankingList;
