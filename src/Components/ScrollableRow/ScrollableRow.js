import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./ScrollableRow.css";

function ScrollableRow({ title, list }) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => {
      setAtStart(container.scrollLeft <= 0);
      setAtEnd(
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      );
    }, 100);
  };

  return (
    <div className="scroll-container-wrapper">
      {title == "" ? (
        <></>
      ) : (
        <div className="scroll-container-label">{title}</div>
      )}

      {!atStart && (
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          ◀
        </button>
      )}

      <div className="scroll-container" ref={scrollRef}>
        {list && list.length > 0 ? (
          list.map((anime) => (
            <Link to={`/anime/${anime.id}`}>
              <div key={anime.id} className="item-card">
                <div className="image-wrapper">
                  <img src={anime.image} alt={anime.en_name} />
                  <div className="image-overlay">
                    <div className="item-title">{anime.jp_name}</div>
                    <div className="item-content">Ep {anime.episodes}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ color: "white" }}>No data available.</div>
        )}
      </div>

      {!atEnd && (
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          ▶
        </button>
      )}
    </div>
  );
}

export default ScrollableRow;
