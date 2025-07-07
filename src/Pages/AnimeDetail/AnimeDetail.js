import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "antd";
import axios from "axios";

import styles from "./AnimeDetail.module.css";

import AnimeReviews from "../AnimeReviews/AnimeReviews";

import ScrollableRow from "../../Components/ScrollableRow/ScrollableRow";

import { AuthContext } from "../../Context/AuthContext";

const { Content } = Layout;

function AnimeDetail() {
  const [anime, setAnime] = useState(null);
  const [userAnimeEntry, setUserAnimeEntry] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const section = searchParams.get("section") || "info";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const scoreLabel = (score) => {
    const labels = [
      "",
      "Appalling",
      "Horrible",
      "Very Bad",
      "Bad",
      "Average",
      "Fine",
      "Good",
      "Very Good",
      "Great",
      "Masterpiece",
    ];
    return labels[score] || "";
  };

  const fetchReviews = async (currentPage = 1) => {
    try {
      setLoadingReviews(true);

      const res = await axios.post("/api/animeReviews", {
        id,
        params: { page: currentPage, limit: 10 },
      });

      if (res.data.success) {
        setReviews(res.data.data.data);
        setHasMore(!!res.data.data.nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setHasMore(false);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleSectionChange = (newSection) => {
    setSearchParams({ section: newSection, page: "1" });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ section: "review", page: newPage.toString() });
  };

  const handleAddToList = async () => {
    try {
      const res = await axios.post("/api/addAnimeToList", {
        userId: user.id,
        animeId: anime.id,
        status: 0,
        score: 0,
        episodes_watched: 0,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setUserAnimeEntry({ status: 0, score: 0, episodes_watched: 0 });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Failed to add anime to list:", error);
      toast.error("Failed to add anime to list");
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUserAnimeEntry((prev) => ({ ...prev, status: newStatus }));

    try {
      const res = await axios.post("/api/updateAnimeInList", {
        userId: user.id,
        animeId: anime.id,
        updates: { status: newStatus },
      });

      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleScoreChange = async (newScore) => {
    setUserAnimeEntry((prev) => ({ ...prev, score: newScore }));

    try {
      const res = await axios.post("/api/updateAnimeInList", {
        userId: user.id,
        animeId: anime.id,
        updates: { score: newScore },
      });

      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (error) {
      console.error("Failed to update score:", error);
      toast.error("Failed to update score");
    }
  };

  const handleEpisodesChange = async (newEpisodes) => {
    setUserAnimeEntry((prev) => ({ ...prev, episodes_watched: newEpisodes }));

    try {
      const res = await axios.post("/api/updateAnimeInList", {
        userId: user.id,
        animeId: anime.id,
        updates: { episodes_watched: newEpisodes },
      });

      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (error) {
      console.error("Failed to update episodes watched:", error);
      toast.error("Failed to update episodes watched");
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      const body = { id };
      if (user && user.id) body.userId = user.id;

      const res = await axios.post("/api/getDetail/", body);
      setAnime(res.data.data);
      setUserAnimeEntry(res.data.inList);
      setRecommendations(res.data.recommendations);
    };

    fetchAnime();

    if (section === "review") {
      fetchReviews(page);
    }
  }, [id, user, section, page]);

  if (!anime) return <div>Loading...</div>;

  return (
    <Layout className={styles["anime-detail-container"]}>
      <ToastContainer />

      <Content className={styles["anime-detail-content"]}>
        <div className={styles["welcome-message"]}>{anime.jp_name}</div>

        <div className={styles["anime-detail"]}>
          <div className={styles["left-column"]}>
            <img
              src={anime.image}
              alt={anime.id}
              className={styles["anime-image"]}
            />
            <h1>{anime.title}</h1>
            <p>
              <strong>Japanese:</strong> {anime.jp_name}
            </p>
            <p>
              <strong>English:</strong> {anime.en_name}
            </p>
            <div className={styles["anime-stats"]}>
              <p>
                <strong>Score:</strong> ⭐ {anime.score.toFixed(2)}
              </p>
            </div>
            <div className={styles["anime-info"]}>
              <p>
                <strong>Type:</strong> {anime.type}
              </p>
              <p>
                <strong>Episodes:</strong> {anime.episodes}
              </p>
              <p>
                <strong>Status:</strong> {anime.status}
              </p>
              <p>
                <strong>Aired:</strong> {anime.aired}
              </p>
              <p>
                <strong>Studios:</strong> {anime.studios.join(", ")}
              </p>
              <p>
                <strong>Genres:</strong> {anime.genres.join(", ")}
              </p>
              <p>
                <strong>Theme:</strong> {anime.themes.join(", ")}
              </p>
            </div>
          </div>

          <div className={styles["right-column"]}>
            <div className={styles["section"]}>
              <div className={styles["btn-section"]}>
                <div className={styles["section-toggle"]}>
                  <button
                    onClick={() => handleSectionChange("info")}
                    className={
                      section === "info"
                        ? styles["active-btn"]
                        : styles["text-tab-btn"]
                    }
                  >
                    Information
                  </button>
                  <button
                    onClick={() => handleSectionChange("review")}
                    className={
                      section === "review"
                        ? styles["active-btn"]
                        : styles["text-tab-btn"]
                    }
                  >
                    Reviews
                  </button>
                </div>
              </div>
            </div>

            {section === "review" ? (
              <>
                {loadingReviews ? (
                  <p>Loading reviews...</p>
                ) : (
                  <div className={styles["section"]}>
                    <AnimeReviews reviews={reviews} />

                    <div className={styles["reviewPagination"]}>
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1 || loadingReviews}
                        className={styles["paginationBtn"]}
                      >
                        Previous
                      </button>

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={!hasMore || loadingReviews}
                        className={styles["paginationBtn"]}
                      >
                        More Reviews
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={styles["section"]}>
                  {userAnimeEntry ? (
                    <div className={styles["user-controls-wrapper"]}>
                      <div className={styles["user-controls"]}>
                        <select
                          value={userAnimeEntry.status}
                          onChange={(e) =>
                            handleStatusChange(Number(e.target.value))
                          }
                        >
                          <option value={1}>Watching</option>
                          <option value={2}>Completed</option>
                          <option value={3}>On Hold</option>
                          <option value={4}>Dropped</option>
                          <option value={0}>Plan to Watch</option>
                        </select>

                        <select
                          value={userAnimeEntry.score}
                          onChange={(e) =>
                            handleScoreChange(Number(e.target.value))
                          }
                        >
                          {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                              {i === 0
                                ? "Select Score"
                                : `(${i}) ${scoreLabel(i)}`}
                            </option>
                          ))}
                        </select>

                        <div className={styles["episodes-input"]}>
                          Episodes:
                          <input
                            type="number"
                            min="0"
                            max={anime.episodes}
                            value={userAnimeEntry.episodes_watched}
                            onChange={(e) =>
                              handleEpisodesChange(Number(e.target.value))
                            }
                          />
                          / {anime.episodes || "?"}
                        </div>

                        {userAnimeEntry.episodes_watched > 3 && (
                          <button
                            className={styles["add-review-button"]}
                            onClick={() => {
                              navigate(`/anime/${anime.id}/addReview`);
                            }}
                          >
                            + Add Review
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToList()}
                      className={styles["add-to-list-button"]}
                    >
                      <span className={styles["add-icon"]}>＋</span> Add to List
                    </button>
                  )}
                </div>

                <div className={styles["section"]}>
                  <h2>Synopsis</h2>
                  <p>{anime.description}</p>
                </div>

                {anime.characters && (
                  <div className={styles["section"]}>
                    <h2>Characters & Voice Actors</h2>
                    <div className={styles["characters-wrapper"]}>
                      {anime.characters.map((char) => (
                        <div key={char.id} className={styles["character-card"]}>
                          <div className={styles["character-left"]}>
                            <img
                              src={char.image}
                              alt={char.name}
                              className={styles["character-img"]}
                            />
                            <div>
                              <div className={styles["character-name"]}>
                                {char.name}
                              </div>
                              <div className={styles["character-role"]}>
                                {char.role}
                              </div>
                            </div>
                          </div>
                          {char.voice_actor && (
                            <div className={styles["va-info"]}>
                              <img
                                src={char.voice_actor.image}
                                alt={char.voice_actor.name}
                                className={styles["va-img"]}
                              />
                              <div>
                                <div className={styles["va-name"]}>
                                  {char.voice_actor.name}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles["section"]}>
                  <h2>Recommendations</h2>
                  <ScrollableRow
                    title=""
                    list={recommendations}
                  ></ScrollableRow>
                </div>
              </>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default AnimeDetail;
