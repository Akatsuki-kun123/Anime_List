import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Dropdown, Layout, Space, Input, Select } from "antd";

import VerticalList from "../../Components/VerticalList/VerticalList.js";
import ScrollableRow from "../../Components/ScrollableRow/ScrollableRow.js";
import ReviewWidget from "../../Components/Widget/ReviewWidget/ReviewWidget.js";

import "./MainPage.css";
import axios from "axios";

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

function MainPage() {
  const [newAnimes, setNewAnimes] = useState(null);
  const [recentReviews, setRecentReviews] = useState(null);
  const [upcomingAnimes, setUpcomingAnimes] = useState(null);
  const [topAiringAnimes, setTopAiringAnimes] = useState(null);

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
      console.log(response.data.data);
      setRecentReviews(response.data.data.slice(0, 9));
    };

    getNewAnimes();
    getRecentReviews();
    getUpcomingAnimes();
    getTopAiringAnimes();
  }, []);

  return (
    <Layout className="mainpage-container">
      <Header className="mainpage-header">
        <Space size={5} className="mainpage-navbar">
          <Dropdown menu={{ items: animeCate }}>
            <div className="mainpage-navbar-item">Anime</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Manga</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Community</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Industry</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Watch</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Read</div>
          </Dropdown>
          <Dropdown menu={{ items }}>
            <div className="mainpage-navbar-item">Help</div>
          </Dropdown>
        </Space>

        <div className="mainpage-search-bar">
          <Select
            size="small"
            defaultValue="anime"
            options={filterOptions}
          ></Select>
          <Input.Search size="small" placeholder="Filled" variant="filled" />
        </div>
      </Header>

      <Content className="mainpage-content">
        <div className="welcome-message">Welcome to MyAnimeList.net!</div>

        <div className="mainpage-content-container">
          <div className="mainpage-content-space">
            <div className="mainpage-content-item">
              <div className="mainpage-content-label">
                MALxJapan -More than just anime-
              </div>

              <Space className="mainpage-content-list">
                <div className="list-item">
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2024/20241213014521_20241121005050_354x220@2x.png"
                  />
                  <a className="list-item-description">
                    Watch "ConBiz!" ー a new Japanese business entertainment
                    program
                  </a>
                </div>

                <div className="list-item">
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2025/20250329041251_kup-354x220@2x.png"
                  />
                  <a className="list-item-description">
                    Award-winning sommelier drama, sweaty romances and sci-fi
                    classics—here are Kodansha's top picks 📚
                  </a>
                </div>

                <div className="list-item">
                  <img
                    width={240}
                    src="https://cdn.myanimelist.net/resources/mxj_panel/2025/20250410005810_354x220@2x(2).png"
                  />
                  <a className="list-item-description">
                    Your guide to 2025's Must-Read Manga is here 📖
                  </a>
                </div>
              </Space>
            </div>

            <div className="mainpage-content-item">
              <ScrollableRow
                title="This Season Animes"
                list={newAnimes}
              ></ScrollableRow>
            </div>

            <div className="mainpage-content-item">
              <ScrollableRow
                title="Upcoming Animes"
                list={upcomingAnimes}
              ></ScrollableRow>
            </div>

            <div className="mainpage-content-item">
              <ReviewWidget reviews={recentReviews}></ReviewWidget>
            </div>
          </div>

          <div className="mainpage-side-content">
            <div className="mainpage-side-content-item">
              <VerticalList title="Top Airing Animes" list={topAiringAnimes} />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default MainPage;
