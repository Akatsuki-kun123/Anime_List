import React from "react";

import "./VerticalList.css";

function VerticalList({ title, list }) {
  return (
    <div className="vertical-list">
      <div className="vertical-list-title">{title}</div>

      <div className="vertical-list-container">
        {list && list.length > 0 ? (
          list.map((anime, index) => (
            <div key={anime.id} className="vertical-item">
              <div className="vertical-rank">{index + 1}.</div>

              <img
                src={anime.image}
                alt={anime.en_name}
                className="vertical-image"
              />

              <div className="vertical-info">
                <div className="vertical-title">{anime.jp_name}</div>

                <div className="vertical-meta-row">
                  <span className="meta-item">{anime.type}</span>
                  <span className="meta-item">Score: {Number(anime.score.toFixed(2)) || "N/A"}</span>
                  {anime.episodes && <span className="meta-item">{anime.episodes} eps</span>}
                </div>

                <div className="vertical-airing">
                  {anime.aired || "Unknown airing time"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "white" }}>No anime found.</div>
        )}
      </div>
    </div>
  );
}

export default VerticalList;
