import React from 'react';
import { Layout, Input } from 'antd';
import { Space, Table, Tag } from 'antd';

const { Header, Content, Sider } = Layout;
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
];

function BodyContent() {
    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
    ];

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