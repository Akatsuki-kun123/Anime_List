import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ListHeader from "./ListHeader/ListHeader.js";
import ListContent from "./ListContent.js";


function AnimeList(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("type") || "all";

  return (
    <div>
      <ListHeader category={category}></ListHeader>
      <ListContent category={category}></ListContent>
    </div>
  );
}

export default AnimeList;
