import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import styles from "./UserProfile.module.css";

import ScrollableRow from "../../Components/ScrollableRow/ScrollableRow.js";

import { AuthContext } from "../../Context/AuthContext";

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function UserProfile() {
  const [profileData, setProfileData] = useState(null);

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.post(`/api/profile`, { userId: id });
        setProfileData(res.data.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["sidebar"]}>
        <img
          src={profileData.image || "https://i.pravatar.cc/150"}
          alt="avatar"
          className={styles["avatar"]}
        />

        <h2>{profileData.username}'s Profile</h2>
        <p>Last Online: Now</p>
        <p>
          {new Date(profileData.joinDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        <div className={styles["sidebar-buttons"]}>
          <button>Anime List</button>
          <button>Manga List</button>
        </div>

        <div className={styles["section"]}>
          <h3>Statistics</h3>
          <div className={styles["stats-section"]}>
            <div>
              <h4>Anime Stats</h4>
              <p>Mean Score: {profileData.meanScore?.toFixed(2) || "N/A"}</p>
              <p>Total Entries: {profileData.totalEntries}</p>
              <ul>
                <li>Watching: {profileData.statusCounts.watching}</li>
                <li>Completed: {profileData.statusCounts.completed}</li>
                <li>On-Hold: {profileData.statusCounts.on_hold}</li>
                <li>Dropped: {profileData.statusCounts.dropped}</li>
                <li>Plan to Watch: {profileData.statusCounts.plan_to_watch}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <p>No biography yet. Write it now.</p>

        <div className={styles["section"]}>
          <h3>Last Anime Updates</h3>

          {profileData.recentAnimeList.length ? (
            <div className={styles["animes-container"]}>
              <div className={styles["animes-column"]}>
                {profileData.recentAnimeList
                  .slice(0, Math.ceil(profileData.recentAnimeList.length / 2))
                  .map((anime) => (
                    <div key={anime.id} className={styles["anime-item"]}>
                      <img
                        src={anime.image || "https://via.placeholder.com/50x75"}
                        alt={anime.en_name}
                        className={styles["anime-thumb"]}
                      />

                      <div className={styles["anime-content"]}>
                        <div className={styles["text-row"]}>
                          <Link
                            to={`/anime/${anime.id}`}
                            className={styles["anime-link"]}
                          >
                            <strong>{anime.en_name}</strong>
                          </Link>
                        </div>

                        <div className={styles["progress-row"]}>
                          <div className={styles["progress-bar-container"]}>
                            <div
                              className={styles["progress-bar-fill"]}
                              style={{
                                width: anime.episodes
                                  ? `${
                                      (anime.episodes_watched /
                                        anime.episodes) *
                                      100
                                    }%`
                                  : "0%",
                              }}
                            />
                          </div>
                        </div>

                        <div className={styles["text-row"]}>
                          <p>
                            {capitalize(anime.status)} {anime.episodes_watched}/
                            {anime.episodes} - Scored: {anime.score}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles["animes-column"]}>
                {profileData.recentAnimeList
                  .slice(Math.ceil(profileData.recentAnimeList.length / 2))
                  .map((anime) => (
                    <div key={anime.id} className={styles["anime-item"]}>
                      <img
                        src={anime.image || "https://via.placeholder.com/50x75"}
                        alt={anime.en_name}
                        className={styles["anime-thumb"]}
                      />

                      <div className={styles["anime-content"]}>
                        <div className={styles["text-row"]}>
                          <Link
                            to={`/anime/${anime.id}`}
                            className={styles["anime-link"]}
                          >
                            <strong>{anime.en_name}</strong>
                          </Link>
                        </div>

                        <div className={styles["progress-row"]}>
                          <div className={styles["progress-bar-container"]}>
                            <div
                              className={styles["progress-bar-fill"]}
                              style={{
                                width: anime.episodes
                                  ? `${
                                      (anime.episodes_watched /
                                        anime.episodes) *
                                      100
                                    }%`
                                  : "0%",
                              }}
                            />
                          </div>
                        </div>

                        <div className={styles["text-row"]}>
                          <p>
                            {capitalize(anime.status)} {anime.episodes_watched}/
                            {anime.episodes} - Scored: {anime.score}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div>No data available.</div>
          )}
        </div>

        <div className={styles["section"]}>
          <h3>Favorites</h3>
          <div className={styles["favorites"]}>
            {profileData.favorites.length ? (
              <ScrollableRow
                title=""
                list={profileData.favorites}
              ></ScrollableRow>
            ) : (
              "No data available."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
