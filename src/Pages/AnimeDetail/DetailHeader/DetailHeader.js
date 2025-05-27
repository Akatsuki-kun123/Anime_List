import { useState } from "react";

import { Button, Space } from "antd";

import "./DetailHeader.css";

function DetailHeader(props) {
  const [category, setCategory] = useState("all");

  const onAllAnime = () => {
    props.onDetail(null);
  };

  return (
    <div>
      <Space
        style={{
          float: "right",
          marginTop: 20,
          marginRight: 15,
          marginBottom: 20,
        }}
        size={"small"}
      >
        <Button className="detail-button" type="text" onClick={onAllAnime}>
          All Anime
        </Button>
        <Button className="detail-button" type="text">
          Top Airing
        </Button>
        <Button className="detail-button" type="text">
          Top Upcoming
        </Button>
        <Button className="detail-button" type="text">
          Top TV Series
        </Button>
        <Button className="detail-button" type="text">
          Top Movies
        </Button>
      </Space>
    </div>
  );
}

export default DetailHeader;
