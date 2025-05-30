import { useState } from "react";

import { Button, Space } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import "./ListHeader.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function ListHeader(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const changeCategory = (type) => {
    searchParams.set("type", type);
    navigate(`/anime-list?${searchParams.toString()}`);
  };

  return (
    <div>
      <div style={{ display: "flex", backgroundColor: "#EFEFEF" }}>
        <UnorderedListOutlined
          style={{
            fontSize: 20,
            marginTop: 20,
            marginLeft: 45,
            position: "absolute",
          }}
        />

        <div
          style={{
            color: "#005DFF",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 20,
            marginLeft: 70,
            marginBottom: 20,
          }}
        >
          Top Anime
        </div>
      </div>

      <Space
        style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }}
        size={"large"}
      >
        {props.category == "all" ? (
          <Button className="list-button-primary" type="primary">
            Top Anime
          </Button>
        ) : (
          <Button
            className="list-button"
            type="text"
            onClick={() => changeCategory("all")}
          >
            Top Anime
          </Button>
        )}
        {props.category == "Aired" ? (
          <Button className="list-button-primary" type="primary">
            Top Airing
          </Button>
        ) : (
          <Button
            className="list-button"
            type="text"
            onClick={() => changeCategory("Aired")}
          >
            Top Airing
          </Button>
        )}
        {props.category == "Movies" ? (
          <Button className="list-button-primary" type="primary">
            Top Movies
          </Button>
        ) : (
          <Button
            className="list-button"
            type="text"
            onClick={() => changeCategory("Movies")}
          >
            Top Movies
          </Button>
        )}
        {props.category == "TV Series" ? (
          <Button className="list-button-primary" type="primary">
            Top TV Series
          </Button>
        ) : (
          <Button
            className="list-button"
            type="text"
            onClick={() => changeCategory("TV Series")}
          >
            Top TV Series
          </Button>
        )}
      </Space>
    </div>
  );
}

export default ListHeader;
