import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table } from 'antd';

const columns = [
    {
        title: 'Mã order',
        dataIndex: 'ma_order',
    },
    {
        title: 'Tên địa điểm',
        dataIndex: 'ten_dia_diem',
    },
    {
        title: 'Tình trạng',
        dataIndex: 'tinh_trang',
    },
    {
        title: 'Tổng trọng lượng',
        dataIndex: 'tong_trong_luong',
    },
    {
        title: 'Tổng kích thước',
        dataIndex: 'tong_kich_thuoc',
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
for (let i = 0; i < 25; i++) {
    data.push({
        key: i,
        ma_order: `121000040` + i,
        ten_dia_diem: 'VINMART+66 ĐẶNG TIẾN ĐÔNG',
        tinh_trang: `Chưa phân tuyến`,
        tong_trong_luong: '150KG',
        tong_kich_thuoc: '3 Khối',
    });
}

const Orders = ({ rowSelection }) => {
    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Orders.Layout = BasicLayout;

export default Orders;