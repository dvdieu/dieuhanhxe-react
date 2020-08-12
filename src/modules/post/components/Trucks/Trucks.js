import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table } from 'antd';

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
for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        bien_so: `29M1-555` + i,
        loai_xe: 'THACO',
        kich_thuoc: `15 Khối`,
        thung_xe: '1,5 Tấn',
    });
}

const Trucks = ({ rowSelection }) => {
    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Trucks.Layout = BasicLayout;

export default Trucks;