import React, { useState, useEffect } from 'react';
//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Skeleton } from 'antd';
const columns = [
    {
        title: 'Mã thống kê',
        dataIndex: 'bien_so',
    },
    {
        title: 'Loại xe',
        dataIndex: 'loai_xe',
    },
    {
        title: 'Trọng lượng',
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

// const data = [];
// for (let i = 0; i < 2; i++) {
//     data.push({
//         key: i,
//         bien_so: `29M1-555` + i,
//         loai_xe: 'THACO',
//         kich_thuoc: `15 Khối`,
//         thung_xe: '1,5 Tấn',
//     });
// }

const data = [
    {
        key: 0,
        bien_so: `29M1-55550`,
        loai_xe: 'ISUZU',
        kich_thuoc: `20 Khối`,
        thung_xe: '2 Tấn',
    },
    {
        key: 0,
        bien_so: `29M1-55551`,
        loai_xe: 'THACO',
        kich_thuoc: `10 Khối`,
        thung_xe: '1 Tấn',
    }
]

const Trucks = ({ rowSelection }) => {
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            let timer = setTimeout(() => {
                setLoading(false);
            }, 2000)
            return () => {
                clearTimeout(timer)
            }
        }, [])

    return (
        <Skeleton loading={loading} active avatar>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Skeleton>
    )
}

Trucks.Layout = BasicLayout;

export default Trucks;