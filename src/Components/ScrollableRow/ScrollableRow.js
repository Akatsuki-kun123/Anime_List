import React, { useState, useRef } from "react";

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
      <div className="scroll-container-label">{title}</div>

      {!atStart && (
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          ◀
        </button>
      )}

      <div className="scroll-container" ref={scrollRef}>
        {list && list.length > 0 ? (
          list.map((elem) => (
            <div key={elem.id} className="item-card">
              <div className="image-wrapper">
                <img src={elem.image} alt={elem.en_name} />
                <div className="image-overlay">
                  <div className="item-title">{elem.jp_name}</div>
                  <div className="item-content">Ep {elem.episodes}</div>
                </div>
              </div>
            </div>
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
