import { useEffect, useState, useContext } from "react";

import { Space, Layout } from "antd";

import axios from "axios";

import styles from "./MainPage.module.css";

import VerticalList from "../../Components/VerticalList/VerticalList.js";
import ScrollableRow from "../../Components/ScrollableRow/ScrollableRow.js";
import ReviewWidget from "../../Components/Widget/ReviewWidget/ReviewWidget.js";

import { AuthContext } from "../../Context/AuthContext";

const { Content } = Layout;

function MainPage() {
  const [newAnimes, setNewAnimes] = useState(null);
  const [recentReviews, setRecentReviews] = useState(null);
  const [upcomingAnimes, setUpcomingAnimes] = useState(null);
  const [topAiringAnimes, setTopAiringAnimes] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getNewAnimes = async () => {
      const response = await axios.get("/api/getNewlyReleasedAnimes");
      setNewAnimes(response.data.data.slice(0, 20));
    };

    const getUpcomingAnimes = async () => {
      const response = await axios.post("/api/getAnimesWithStatus", {
        status: "Not yet aired",
      });
      setUpcomingAnimes(response.data.data.slice(0, 20));
    };

    const getTopAiringAnimes = async () => {
      const response = await axios.post("/api/getAnimesWithStatus", {
        status: "Currently Airing",
      });
      setTopAiringAnimes(response.data.data.slice(0, 20));
    };

    const getRecentReviews = async () => {
      const response = await axios.get("/api/getLatestReviewPerAnime");
      setRecentReviews(response.data.data.slice(0, 5));
    };

    const getRecommendations = async () => {
      const response = await axios.post("/api/recommendations", {
        userId: user.id,
      });
      setRecommendations(response.data.data.results);
    };

    if (user) {
      getRecommendations();
    }
    getNewAnimes();
    getRecentReviews();
    getUpcomingAnimes();
    getTopAiringAnimes();
  }, [user]);

  return (
    <Layout className={styles["mainpage-container"]}>
      <Content className={styles["mainpage-content"]}>
        <div className={styles["welcome-message"]}>
          Welcome to MyAnimeList.net!
        </div>

        <div className={styles["mainpage-content-container"]}>
          <div className={styles["mainpage-content-space"]}>
            <div className={styles["mainpage-content-item"]}>
              <div className={styles["mainpage-content-label"]}>
                MALxJapan -More than just anime-
              </div>

              <Space className={styles["mainpage-content-list"]}>
                <div className={styles["list-item"]}>
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2024/20241213014521_20241121005050_354x220@2x.png"
                  />
                  <a className={styles["list-item-description"]}>
                    Watch "ConBiz!" ー a new Japanese business entertainment
                    program
                  </a>
                </div>

                <div className={styles["list-item"]}>
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2025/20250329041251_kup-354x220@2x.png"
                  />
                  <a className={styles["list-item-description"]}>
                    Award-winning sommelier drama, sweaty romances and sci-fi
                    classics—here are Kodansha's top picks 📚
                  </a>
                </div>

                <div className={styles["list-item"]}>
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2025/20250410005810_354x220@2x(2).png"
                  />
                  <a className={styles["list-item-description"]}>
                    Your guide to 2025's Must-Read Manga is here 📖
                  </a>
                </div>
              </Space>
            </div>

            <div className={styles["mainpage-content-item"]}>
              <ScrollableRow
                title="This Season Animes"
                list={newAnimes}
              ></ScrollableRow>
            </div>

            <div className={styles["mainpage-content-item"]}>
              <ScrollableRow
                title="Upcoming Animes"
                list={upcomingAnimes}
              ></ScrollableRow>
            </div>

            {recommendations ? (
              <div className={styles["mainpage-content-item"]}>
                <ScrollableRow
                  title="Recommendations"
                  list={recommendations}
                ></ScrollableRow>
              </div>
            ) : (
              <></>
            )}

            <div className={styles["mainpage-content-item"]}>
              <ReviewWidget reviews={recentReviews}></ReviewWidget>
            </div>
          </div>

          <div className={styles["mainpage-side-content"]}>
            <div className={styles["mainpage-side-content-item"]}>
              <VerticalList title="Top Airing Animes" list={topAiringAnimes} />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default MainPage;
