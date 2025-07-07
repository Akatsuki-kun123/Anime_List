import { useState, useEffect } from "react";

import { Layout, Input, Select, Spin } from "antd";

import axios from "axios";

import styles from "./FilterPage.module.css";

import RankingList from "../../Components/RankingList/RankingList.js";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

function FilterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get("/api/genres")
      .then((res) => {
        setGenres(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch genres", err);
      });
  }, []);

  const handleSearch = () => {
    setLoading(true);

    axios
      .post("/api/search", { keyword: searchTerm, genre: selectedGenre })
      .then((res) => {
        setAnimeList(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to search anime", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout className={styles["anime-list-container"]}>
      <Content className={styles["anime-list-container"]}>
        <div className={styles["welcome-message"]}>Search Anime</div>

        <div className={styles["search-container"]}>
          <Search
            placeholder="Search by title..."
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Select genre"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setSelectedGenre(value)}
          >
            {genres.map((g) => (
              <Option key={g.name} value={g.name}>
                {g.name}
              </Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div className={styles["spinner-container"]}>
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles["anime-list-content"]}>
            <RankingList list={animeList} page={1} limit={50} />
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default FilterPage;
