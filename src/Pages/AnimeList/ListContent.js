import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Space, Table, Tag } from "antd";

import axios from "axios";

function ListContent(props) {
  const navigate = useNavigate();
  const [list, setList] = useState(null);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img width={112.5} height={159} src={image}></img>,
    },
    {
      title: "Name",
      dataIndex: "jp_name",
      key: "jp_name",
      render: (text) => <a onClick={() => onDetail(text)}>{text}</a>,
    },
    {
      title: "Episodes",
      dataIndex: "episodes",
      key: "episodes",
    },
    {
      title: "Aired",
      dataIndex: "aired",
      key: "aired",
    },
    {
      title: "Studios",
      dataIndex: "studios",
      key: "studios",
      render: (_, { studios }) => (
        <Space direction="vertical" size="small">
          {studios.map((studio) => {
            return <a>{studio.name}</a>;
          })}
        </Space>
      ),
    },
    {
      title: "Genres",
      key: "genres",
      dataIndex: "genres",
      render: (_, { genres }) => (
        <>
          {genres.map((genre) => {
            let color = genre.name.length > 7 ? "geekblue" : "green";
            if (genre.name === "Drama") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={genre.name}>
                {genre.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Producers",
      key: "producers",
      dataIndex: "producers",
      render: (_, { producers }) => (
        <Space direction="vertical" size="small">
          {producers.slice(0, 3).map((producer) => {
            return <a>{producer.name}</a>;
          })}
        </Space>
      ),
    },
  ];

  const onDetail = (name) => {
    navigate(`/anime/${name}`);
  };

  useEffect(() => {
    axios.post("/api/list", { type: props.category }).then((result) => {
      setList(result.data.data);
    });
  }, [props.category]);

  return (
    <div>
      {list ? (
        <Table
          className="list"
          columns={columns}
          dataSource={list}
          rowKey="key"
        />
      ) : (
        <div style={{ backgroundColor: "white", height: 5000 }}></div>
      )}
    </div>
  );
}

export default ListContent;
