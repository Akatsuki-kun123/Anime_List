import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { Space, Input, Layout, Select, Dropdown } from "antd";

import styles from "./App.module.css";

import Login from "../AuthPages/Login";
import Register from "../AuthPages/Register";
import MainPage from "../MainPage/MainPage";
import AnimeList from "../AnimeList/AnimeList";
import AnimeDetail from "../AnimeDetail/AnimeDetail";
import FilterPage from "../FilterPage/FilterPage";
import AnimeSearch from "../AnimeSearch/AnimeSearch";
import UserProfile from "../UserProfile/UserProfile";
import UserReviews from "../UserReviews/UserReviews";
import AddReview from "../AddReview/AddReview";
import Recommendation from "../Recommendation/Recommendation";

import HeaderCompo from "../../Components/Header/Header";
import AuthButtonsFixed from "../../Components/AuthButtons/AuthButtonsFixed";

import { AuthProvider } from "../../Context/AuthContext";

const { Header, Content } = Layout;

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
    label: <Link to="/filter">Anime Search</Link>,
  },
  {
    key: "2",
    label: <Link to="/anime_list">Top Anime</Link>,
  },
  {
    key: "5",
    label: <Link to="/reviews">Reviews</Link>,
  },
  {
    key: "6",
    label: <Link to="/recommendation">Recommendations</Link>,
  },
];

const filterOptions = [
  { value: "all", label: "All" },
  { value: "anime", label: "Anime" },
  { value: "manga", label: "Manga" },
  { value: "characters", label: "Characters" },
  { value: "people", label: "People" },
];

function App() {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (!value.trim()) return;
    navigate(`/search/${encodeURIComponent(value.trim())}`);
  };

  return (
    <AuthProvider>
      <Layout className={styles["container"]}>
        <Header className={styles["header"]}>
          <div className={styles["logo"]} />

          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link
              to="/"
              style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
            >
              AnimeList
            </Link>

            <HeaderCompo></HeaderCompo>
          </div>
        </Header>

        <Content className={styles["content"]}>
          <Layout className={styles["content-container"]}>
            <Header className={styles["content-header"]}>
              <Space size={5} className={styles["content-navbar"]}>
                <Dropdown menu={{ items: animeCate }}>
                  <div className={styles["content-navbar-item"]}>Anime</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Manga</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Community</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Industry</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Watch</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Read</div>
                </Dropdown>
                <Dropdown menu={{ items }}>
                  <div className={styles["content-navbar-item"]}>Help</div>
                </Dropdown>
              </Space>

              <div className={styles["content-search-bar"]}>
                <Select
                  size="small"
                  defaultValue="anime"
                  options={filterOptions}
                ></Select>
                <Input.Search
                  size="small"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  variant="filled"
                />
              </div>
            </Header>

            <Content className={styles["content-container"]}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/anime_list" element={<AnimeList />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
                <Route path="/filter" element={<FilterPage />} />
                <Route path="/search/:query" element={<AnimeSearch />} />
                <Route path="/reviews" element={<UserReviews />} />
                <Route path="/anime/:id/addReview" element={<AddReview />} />
                <Route path="/recommendation" element={<Recommendation />} />
              </Routes>
            </Content>
          </Layout>
        </Content>

        <AuthButtonsFixed />
      </Layout>
    </AuthProvider>
  );
}

export default App;
