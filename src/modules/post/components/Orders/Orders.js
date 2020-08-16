import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Typography, Tag, Button } from 'antd';
//lib
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

const Orders = ({ rowSelection, data }) => {
    const history = useHistory();

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
            render: (text, record) => (
                <Button type='link' onClick={() => history.push(`/phantuyen/chitiethanghoa/${record.id}`)}>{"Chi tiết"}</Button>
            ),
        },
    ];

    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Orders.Layout = BasicLayout;

export default Orders;