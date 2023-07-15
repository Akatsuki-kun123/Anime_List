import React, { useState } from 'react';

import ListHeader from './ListHeader/ListHeader.js';
import ListContent from './ListContent.js';

function AnimeList(props) {
    const [category, setCategory] = useState('all');

    const changeCategory = (type) => {
        setCategory(type)
    }

    return (
        <div>
            <ListHeader category={category} changeCategory={changeCategory}></ListHeader>
            <ListContent onDetail={props.onDetail} category={category}></ListContent>
        </div>
    )
}

export default AnimeList;