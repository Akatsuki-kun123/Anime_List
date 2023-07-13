import React  from 'react';

import DetailHeader from './DetailHeader/DetailHeader.js';
import DetailContent from './DetailContent/DetailContent.js';

function AnimeDetail(props) {
    return (
        <div style={{ backgroundColor: 'black' }}>
            <DetailHeader onDetail={props.onDetail}></DetailHeader>
            <DetailContent detail={props.detail}></DetailContent>
        </div>
    )
}

export default AnimeDetail;