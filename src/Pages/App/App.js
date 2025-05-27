import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Layout, Input } from "antd";

import "./App.css";
import MainPage from "../MainPage/MainPage";
import AnimeList from "../AnimeList/AnimeList";
import AnimeDetail from "../AnimeDetail/AnimeDetail";

import AuthButtons from "../../Components/AuthButtons/AuthButtons";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="container">
        <Header className="header">
          <div className="logo" />

          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to='/' style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              AnimeList
            </Link>

            <div className="">
              <AuthButtons></AuthButtons>
            </div>
          </div>
        </Header>

        <Content className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/anime_list" element={<AnimeList />} />
            <Route path="/anime/:name" element={<AnimeDetail />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
