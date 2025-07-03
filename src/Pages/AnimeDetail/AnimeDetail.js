import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Space, Input, Layout, Select, Dropdown } from "antd";

import axios from "axios";

import styles from "./AnimeDetail.module.css";
import ScrollableRow from "../../Components/ScrollableRow/ScrollableRow";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const animeCate = [
  {
    key: "1",
    label: <Link href="/anime-search">Anime Search</Link>,
  },
  {
    key: "2",
    label: <Link to="/anime_detail">Top Anime</Link>,
  },
  {
    key: "3",
    label: <Link>Seasonal Anime</Link>,
  },
  {
    key: "4",
    label: <Link>Videos</Link>,
  },
  {
    key: "5",
    label: <Link>Reviews</Link>,
  },
  {
    key: "6",
    label: <Link>Recommendations</Link>,
  },
  {
    key: "7",
    label: <Link>2025 Challenge</Link>,
  },
  {
    key: "8",
    label: <Link>Fantasy Anime League</Link>,
  },
];

const filterOptions = [
  { value: "all", label: "All" },
  { value: "anime", label: "Anime" },
  { value: "manga", label: "Manga" },
  { value: "characters", label: "Characters" },
  { value: "people", label: "People" },
];

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [section, setSection] = useState("info");
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await axios.post(`/api/getDetail/`, { id });
      setAnime(res.data.data);
      setRecommendations(res.data.recommendations);
      // console.log(res.data.recommendations);
    };

    fetchAnime();
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  return (
    <Layout className={styles["anime-detail-container"]}>
      <Header className={styles["anime-detail-header"]}>
        <Space size={5} className={styles["anime-detail-navbar"]}>
          <Dropdown menu={{ items: animeCate }}>
            <div className={styles["anime-detail-navbar-item"]}>Anime</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Manga</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Community</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Industry</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Watch</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Read</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-detail-navbar-item"]}>Help</div>
          </Dropdown>
        </Space>

        <div className={styles["anime-detail-search-bar"]}>
          <Select
            size="small"
            defaultValue="anime"
            options={filterOptions}
          ></Select>
          <Input.Search size="small" placeholder="Filled" variant="filled" />
        </div>
      </Header>

      <Content className={styles["anime-detail-container"]}>
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
                <strong>Score:</strong> ⭐ {anime.score}
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
            </div>
          </div>

          <div className={styles["right-column"]}>
            <div className={styles["section"]}>
              <div className={styles["btn-section"]}>
                <div className={styles["section-toggle"]}>
                  <button
                    onClick={() => setSection("info")}
                    className={
                      section == "info"
                        ? styles["active-btn"]
                        : styles["text-tab-btn"]
                    }
                  >
                    Information
                  </button>
                  <button
                    onClick={() => setSection("review")}
                    className={
                      section == "review"
                        ? styles["active-btn"]
                        : styles["text-tab-btn"]
                    }
                  >
                    Reviews
                  </button>
                </div>
              </div>
            </div>

            <div className={styles["section"]}>
              <h2>Synopsis</h2>
              <p>{anime.description}</p>
            </div>

            {anime.characters && (
              <div className={styles["section"]}>
                <h2>Characters & Voice Actors</h2>
                <div className={styles["characters-wrapper"]}>
                  {anime.characters ? (
                    anime.characters.map((char) => (
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
                    ))
                  ) : (
                    <></>
                  )}
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
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default AnimeDetail;
