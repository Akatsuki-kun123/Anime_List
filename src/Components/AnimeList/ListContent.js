import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';

import axios from 'axios';

function ListContent(props) {
  const [list, setList] = useState(null);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img width={112.5} height={159} src={image}></img>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a onClick={() => onDetail(text)}>{ text }</a>,
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
      render: (_, { studio }) => (
        <>
          <a>{ studio.name }</a>
        </>
      ),
    },
    {
      title: 'Genres',
      key: 'genres',
      dataIndex: 'genres',
      render: (_, { genres }) => (
        <>
          {genres.map((genre) => {
            let color = genre.name.length > 7 ? 'geekblue' : 'green';
            if (genre.name === 'Drama') {
              color = 'volcano';
            }

            return (
              <Tag color={color} key={genre.name}>
                { genre.name.toUpperCase() }
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
        <Space size='middle'>
          {producers.map((producer) => {
            return (
              <a>{ producer.name }</a>
            );
            })
          }
        </Space>
      ),
    },
  ];

  const onDetail = (name) => {
    axios.post('/api/getDetail', { name: name }).then(res => {
        props.onDetail(res.data.data);
      }
    );
  }

  useEffect(() => {
    axios.post('/api/list', { type: props.category }).then(result => {
      setList(result.data.data);
    });
  }, [props.category]);

  return (
    <div>
      {list ? <Table className='list' columns={columns} dataSource={list} rowKey='key' /> : 
        <div style={{ backgroundColor: 'white', height: 5000 }}></div>
      }
    </div>
  )
}

export default ListContent;