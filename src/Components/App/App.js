import React from 'react';
import { Layout, Input, List } from 'antd';

import './App.css';
import AnimeList from '../AnimeList/AnimeList';

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />

          <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
          }}>
            <div style={{
              color: 'white',
              fontSize: 20, 
              fontWeight: 'bold', 
            }}>
              AnimeList
            </div>

            <Input
              style={{ 
                right: 15,
                width: 'fit-content', 
                height: 'fit-content',
                display: 'inline-block',
                position: 'absolute',
                marginTop: 15,
              }}
              className="anime_search_bar" 
              placeholder="Search Anime"
            />
          </div>
        </Header>

        <Content style={{ backgroundColor: "white" }}>
          <AnimeList></AnimeList>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
