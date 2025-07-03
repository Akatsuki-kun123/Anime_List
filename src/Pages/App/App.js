import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Layout } from "antd";

import "./App.css";
import MainPage from "../MainPage/MainPage";
import AnimeList from "../AnimeList/AnimeList";
import AnimeDetail from "../AnimeDetail/AnimeDetail";

import AuthButtons from "../../Components/AuthButtons/AuthButtons";
import AuthButtonsFixed from "../../Components/AuthButtons/AuthButtonsFixed";

const { Header, Content, Footer } = Layout;

function App() {
  const location = useLocation();

  const isMainPage = location.pathname === "/";

  return (
    <Layout className="container">
      <Header className="header">
        <div className="logo" />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link
            to="/"
            style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
          >
            AnimeList
          </Link>

          <div className="auth-button">
            <AuthButtons></AuthButtons>
          </div>
        </div>
      </Header>

      <Content className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/anime_list" element={<AnimeList />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </Content>

      {isMainPage && (
        <Footer className="footer">
          <AuthButtonsFixed></AuthButtonsFixed>
        </Footer>
      )}
    </Layout>
  );
}

export default App;
