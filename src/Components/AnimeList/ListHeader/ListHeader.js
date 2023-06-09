import { useState } from 'react';

import { Button, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import './ListHeader.css'

const onChange = (key) => {
    console.log(key);
};

function ListHeader() {
    const [category, setCategory] = useState('all');

    return (
        <div>
            <div style={{ display: 'flex', backgroundColor: '#EFEFEF' }}>
                <UnorderedListOutlined style={{ fontSize: 20, marginTop: 20, marginLeft: 45, position: 'absolute' }}/>

                <div style={{ 
                    color: '#005DFF',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginLeft: 70,
                    marginBottom: 20,
                }}>
                    Top Anime
                </div>
            </div>

            <Space style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }} size={'large'}>
                <Button className='list-button-primary' type='primary'>All Anime</Button>
                <Button className='list-button' type='text'>Top Airing</Button>
                <Button className='list-button' type='text'>Top Upcoming</Button>
                <Button className='list-button' type='text'>Top TV Series</Button>
                <Button className='list-button' type='text'>Top Movies</Button>
            </Space>
        </div>
    );
};

export default ListHeader;