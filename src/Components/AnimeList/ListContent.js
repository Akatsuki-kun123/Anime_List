import React from 'react';
import { Space, Table, Tag } from 'antd';

import data from '../../Constants/data.json';

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
          let color = genre.length > 7 ? 'geekblue' : 'green';
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

function ListContent() {
  return (
    <div>
      <Table className="list" columns={columns} dataSource={data} />
    </div>
  )
}

export default ListContent;