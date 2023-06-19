import React, { useState } from 'react';
import { Layout, Input } from 'antd';

import './App.css';
import AnimeList from '../AnimeList/AnimeList';
import AnimeDetail from '../AnimeDetail/AnimeDetail';

const { Header, Content } = Layout;

function App() {
  const [name, setName] = useState(null);

  const onDetail = (name) => {
    setName(name);
  }

  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
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

        <Content>
          { name ? <AnimeDetail name={name} onDetail={onDetail}></AnimeDetail> : <AnimeList onDetail={onDetail}></AnimeList> }
        </Content>
      </Layout>
    </div>
  );
}

export default App;
