import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Space, Input, Layout, Select, Dropdown } from "antd";

import axios from "axios";

import styles from "./AnimeList.module.css";
import RankingList from "../../Components/RankingList/RankingList.js";

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
    label: <Link to="/anime_list">Top Anime</Link>,
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

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || null;
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 50;

  useEffect(() => {
    axios.post("/api/list", { params: { page, limit } }).then((result) => {
      setAnimeList(result.data.data);
    });
  }, [page, limit]);

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
      <Header className={styles["anime-list-header"]}>
        <Space size={5} className={styles["anime-list-navbar"]}>
          <Dropdown menu={{ items: animeCate }}>
            <div className={styles["anime-list-navbar-item"]}>Anime</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Manga</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Community</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Industry</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Watch</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Read</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className={styles["anime-list-navbar-item"]}>Help</div>
          </Dropdown>
        </Space>

        <div className={styles["anime-list-search-bar"]}>
          <Select
            size="small"
            defaultValue="anime"
            options={filterOptions}
          ></Select>
          <Input.Search size="small" placeholder="Filled" variant="filled" />
        </div>
      </Header>

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
