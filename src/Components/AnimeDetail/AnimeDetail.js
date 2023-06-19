import React  from 'react';
import DetailHeader from './DetailHeader/DetailHeader.js';
import DetailContent from './DetailContent.js';

function AnimeDetail(props) {
    return (
        <div style={{ backgroundColor: 'black' }}>
            <DetailHeader onDetail={props.onDetail}></DetailHeader>
            <DetailContent name={props.name}></DetailContent>
        </div>
    )
}

export default AnimeDetail;