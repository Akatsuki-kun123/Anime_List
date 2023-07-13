import React from 'react';

import ListHeader from './ListHeader/ListHeader.js';
import ListContent from './ListContent.js';

function AnimeList(props) {
    return (
        <div>
            <ListHeader></ListHeader>
            <ListContent onDetail={props.onDetail}></ListContent>
        </div>
    )
}

export default AnimeList;