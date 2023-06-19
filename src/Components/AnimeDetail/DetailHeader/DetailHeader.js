import { useState } from 'react';
import { Button, Space } from 'antd';

import './DetailHeader.css'

function DetailHeader(props) {
    const [category, setCategory] = useState('all');

    const onAllAnime = () => {
        props.onDetail(null);
    }

    return (
        <div>
            <Space style={{ float: 'right', marginTop: 10, marginRight: 15, marginBottom: 20 }} size={ 'small' }>
                <Button type="text" onClick={onAllAnime}>All Anime</Button>
                <Button type="text">Top Airing</Button>
                <Button type="text">Top Upcoming</Button>
                <Button type="text">Top TV Series</Button>
                <Button type="text">Top Movies</Button>
            </Space>

            <div style={{ marginBottom: 30 }}>Hello</div>
        </div>
    );
};

export default DetailHeader;