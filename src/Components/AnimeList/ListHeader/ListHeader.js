import { useState } from 'react';
import { Button, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

import './ListHeader.css'

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: `Tab 1`,
        //children: `Content of Tab Pane 1`,
    },
    {
        key: '2',
        label: `Tab 2`,
        //children: `Content of Tab Pane 2`,
    },
    {
        key: '3',
        label: `Tab 3`,
        //children: `Content of Tab Pane 3`,
    },
];

function ListHeader() {
    const [category, setCategory] = useState('all');

    return (
        <div>
            <div style={{ display: 'flex', backgroundColor: "#EFEFEF" }}>
                <UnorderedListOutlined 
                    style={{ 
                        fontSize: 20,
                        marginTop: 20,
                        marginLeft: 45,
                        position: 'absolute' 
                    }} 
                />

                <div style={{ 
                    color: "#005DFF",
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginLeft: 70,
                    marginBottom: 20,
                }}>
                    Top Anime
                </div>
            </div>

            <Space 
                style={{ 
                    marginTop: 20,
                    marginLeft: 20,
                    marginBottom: 20,
                }}
                size={ 'large' }
            >
                <Button type="primary">All Anime</Button>
                <Button type="text">Top Airing</Button>
                <Button type="text">Top Upcoming</Button>
                <Button type="text">Top TV Series</Button>
                <Button type="text">Top Movies</Button>
            </Space>
        </div>
    );
};

export default ListHeader;