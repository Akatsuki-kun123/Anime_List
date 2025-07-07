import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import styles from "./AnimeSearch.module.css";

import AnimeCard from "../../Components/AnimeCard/AnimeCard";

function AnimeSearch() {
  const { query } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const limit = 21;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await axios.post("/api/searchAnimes", {
          query,
          page,
          limit,
        });

        if (res.data.success) {
          setResults(res.data.data.results);
          setTotal(res.data.data.total);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, page]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  if (loading) return <p>Loading search results...</p>;

  return (
    <div className={styles["search-results-container"]}>
      <h2 className={styles["search-heading"]}>
        Results for: <span style={{ color: "#f5f5f5" }}>"{query}"</span>
      </h2>

      <div className={styles["anime-grid"]}>
        {results.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      <div className={styles["pagination-controls"]}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={styles["pagination-btn"]}
        >
          Previous
        </button>
        <span className={styles["pagination-info"]}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={styles["pagination-btn"]}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AnimeSearch;
