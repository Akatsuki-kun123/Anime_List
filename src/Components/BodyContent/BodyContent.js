import React from 'react';
import { Layout, Input } from 'antd';
import { Space, Table, Tag } from 'antd';
import data from '../../Constants/data.json';

const { Header, Content, Sider } = Layout;
const columns = [
    {
      title: 'Name',
      dataIndex: 'JPname',
      key: 'JPname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Episodes',
      dataIndex: 'episodes',
      key: 'episodes',
    },
    {
      title: 'Aired',
      dataIndex: 'aired',
      key: 'aired',
    },
    {
      title: 'Studios',
      dataIndex: 'studios',
      key: 'studios',
    },
    {
      title: 'Genres',
      key: 'genres',
      dataIndex: 'genres',
      render: (_, { genres }) => (
        <>
          {genres.map((genre) => {
            let color = genre.length > 5 ? 'geekblue' : 'green';
            if (genre === 'Drama') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={genre}>
                {genre.toUpperCase()}
              </Tag>
            );
            })
          }
        </>
      ),
    },
    {
      title: 'Producers',
      key: 'producers',
      dataIndex: 'producers',
      render: (_, { producers }) => (
        <Space size="middle">
          {producers.map((producer) => {
            return (
              <a>{producer}</a>
            );
            })
          }
        </Space>
      ),
    },
];

function BodyContent() {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row',
                }}>
                  <div style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>AnimeList</div>
                  
                  <Input 
                    style={{ 
                      right: 15,
                      marginTop: 15,
                      width: 'fit-content', 
                      height: 'fit-content',
                      position: 'absolute',
                      display: 'inline-block',
                    }}
                      className="search_bar" 
                      placeholder="Search Anime"
                  />
                </div>
            </Header>

            <Content>
                <Table columns={columns} dataSource={data} />
            </Content>
        </Layout>
    )
}

export default BodyContent