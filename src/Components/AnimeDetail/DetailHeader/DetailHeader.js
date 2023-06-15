import { useState } from 'react';
import { Button, Space } from 'antd';

import './DetailHeader.css'

const onChange = (key) => {
    console.log(key);
};

function DetailHeader() {
    const [category, setCategory] = useState('all');

    return (
        <div>
            <Space style={{ float: 'right', marginTop: 10, marginRight: 15, marginBottom: 20 }} size={ 'small' }>
                <Button type="text">All Anime</Button>
                <Button type="text">Top Airing</Button>
                <Button type="text">Top Upcoming</Button>
                <Button type="text">Top TV Series</Button>
                <Button type="text">Top Movies</Button>
            </Space>
        </div>
    );
};

export default DetailHeader;