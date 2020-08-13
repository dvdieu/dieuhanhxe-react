import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Typography, Tag } from 'antd';

const { Text } = Typography;

const columns = [
    {
        title: 'Mã order',
        dataIndex: 'ma_order',
    },
    {
        title: 'Tên địa điểm',
        dataIndex: 'ten_dia_diem',
        width: 320,
    },
    {
        title: 'Tình trạng',
        dataIndex: 'tinh_trang',
        render: text => (
        <Tag color='blue'>{text}</Tag>
        )
    },
    {
        title: 'Tổng trọng lượng',
        dataIndex: 'tong_trong_luong',
        render: (text, record) => (
            <>
                <Text>{record.tong_trong_luong + ' KG'}</Text>
            </>
        ),
    },
    {
        title: 'Tổng kích thước',
        dataIndex: 'tong_kich_thuoc',
        render: (text, record) => (
            <>
                <Text>{record.tong_kich_thuoc + ' khối'}</Text>
            </>
        ),
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



const Orders = ({ rowSelection, data }) => {
    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Orders.Layout = BasicLayout;

export default Orders;