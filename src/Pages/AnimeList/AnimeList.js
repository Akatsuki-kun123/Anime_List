import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { Layout } from "antd";
import axios from "axios";

import styles from "./AnimeList.module.css";

import RankingList from "../../Components/RankingList/RankingList.js";

import { AuthContext } from "../../Context/AuthContext.js";

const { Content } = Layout;

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [userAnimeList, setUserAnimeList] = useState([]);

  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 50;

  useEffect(() => {
    axios
      .post("/api/userAnimeList", { id: user.id })
      .then((res) => {
        setUserAnimeList(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user anime list", err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("/api/list", { params: { page, limit } })
      .then((result) => {
        const animeData = result.data.data;

        const merged = animeData.map((anime) => {
          const userEntry = userAnimeList.find(
            (entry) => String(entry.anime_id) === String(anime.id)
          );

          return {
            ...anime,
            userScore: userEntry ? userEntry.score : null,
            userStatus: userEntry ? userEntry.status : null,
          };
        });

        setAnimeList(merged);
      })
      .catch((err) => {
        console.error("Failed to fetch anime list", err);
      });
  }, [page, limit, userAnimeList]);

  const handleNextPage = () => {
    setSearchParams({ page: parseInt(page) + 1 });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: parseInt(page) - 1 });
    }
  };

  return (
    <Layout className={styles["anime-list-container"]}>
      <Content className={styles["anime-list-container"]}>
        <div className={styles["welcome-message"]}>Top Anime List</div>

        <div className={styles["anime-list-content"]}>
          <RankingList list={animeList} page={page} limit={limit}></RankingList>
        </div>

        <div className={styles["pagination-btn"]}>
          <button onClick={handlePreviousPage} disabled={page == 1}>
            ← Previous
          </button>
          <button onClick={handleNextPage}>Next →</button>
        </div>
      </Content>
    </Layout>
  );
}

export default AnimeList;
