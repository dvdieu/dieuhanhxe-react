import React, { useState } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Button } from 'antd';

const columns = [
    {
        title: 'Biển số',
        dataIndex: 'bien_so',
    },
    {
        title: 'Loại xe',
        dataIndex: 'loai_xe',
    },
    {
        title: 'Kích thước',
        dataIndex: 'kich_thuoc',
    },
    {
        title: 'Thùng xe',
        dataIndex: 'thung_xe',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
            <a href='/'>Chi tiết</a>
        ),
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        bien_so: `29M1-5555` + i,
        loai_xe: 'THACO',
        kich_thuoc: `15 khối`,
        thung_xe: '1,5 tấn'
    });
}

const Fleets = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Fleets.Layout = BasicLayout;

export default Fleets;