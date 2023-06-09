import React, { useState } from 'react';

import data from '../../Constants/data.json';

function DetailContent() {
    const [anime, setAnime] = useState(data[0]);

    return (
        <div>
            <div></div>
            <div style={{ marginLeft: 20, fontSize: 30, color: 'white', maxWidth: 700 }}> 
                { anime.JPname } 
            </div>
            <div style={{ marginLeft: 20, fontSize: 15, color: 'white' }}>
                { anime.ENname }
            </div>

            <div>
                <img src={anime.image} style={{ marginLeft: 20 }}></img>
            </div>
        </div>
    )
}

export default DetailContent;