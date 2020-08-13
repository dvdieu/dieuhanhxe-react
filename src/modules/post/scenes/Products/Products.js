import React from 'react';
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Avatar, Typography } from 'antd';

const { Text } = Typography;


const columns = [
    {
        title: "",
        dataIndex: "hinh_anh",
        width: 100,
        render: (text, record) => (
            <>
                <Avatar shape="square" size={64} src={require(`../../../../assets/images/products/${record.hinh_anh}`)} />
            </>
        ),
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'ma_hang_hoa',
        render: (text, record) => (
            <>
                <Text>{record.ten_hang_hoa}</Text>
                <br />
                <Text type='secondary'>{record.ma_hang_hoa}</Text>
            </>
        ),
    },
    {
        title: 'Loại',
        dataIndex: 'loai_hang_hoa',
    },
    {
        title: 'Số lượng',
        dataIndex: 'so_luong',
        width: 100,
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => (
            <a href='/'>Chi tiết</a>
        ),
    },
];

const _CHINHANH = ["BANHTHAIMD", "ADCMINHDUONG", "BANHGAOMD"];
const _HINHANH = ['1.jpg', '2.jpg', '3.jpg', '4.jpeg', '5.jpg'];
const _IDVTHH = ["F14BO003", "F14CA007", "100226"];
const _TENVTHH = ["Nước mắm cốt nhĩ 40N 300ml x 24", "Tương ớt 5,2kg x 4", "Bộ Rổ Nhựa 2168", "Nước trái cây thạch Collagen150gx36"];
const _LOAIVATTUHH = ['ADC Foods', 'Nhóm thức uống dinh dưỡng', 'Bánh Gạo', 'MÌ ĂN LIỀN', 'Nước Thạch', 'NHÃN BRAND']
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        hinh_anh: _HINHANH[Math.floor(Math.random() * _HINHANH.length)],
        ten_hang_hoa: _TENVTHH[Math.floor(Math.random() * _CHINHANH.length)],
        ma_hang_hoa: _IDVTHH[Math.floor(Math.random() * _CHINHANH.length)] + i,
        loai_hang_hoa: _LOAIVATTUHH[Math.floor(Math.random() * _CHINHANH.length)],
        so_luong: Math.floor(Math.random()),
    });
}

const Product = () => {
    return (
        <Table rowSelection={null} columns={columns} dataSource={data} />
    )
}

Product.Layout = BasicLayout;

export default Product;