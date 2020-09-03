import React from 'react';
//antd
import { Table, Avatar, Typography } from 'antd';
//lib
import { useRouteMatch } from 'react-router-dom';

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
        title: 'Khối lượng',
        dataIndex: 'khoi_luong',
    },
    {
        title: 'Kích thước',
        dataIndex: 'kich_thuoc',
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

const data_table_template = {
    0: [
        {
            key: 0,
            hinh_anh: '1.jpg',
            ten_hang_hoa: 'Nước cam ép TEPPY',
            ma_hang_hoa: 'CE0001',
            loai_hang_hoa: 'Nước ép',
            khoi_luong: '400 KG',
            kich_thuoc: '2 Khối',
            so_luong: '10 thùng',
        },
        {
            key: 1,
            hinh_anh: '2.jpg',
            ten_hang_hoa: 'Sữa cô gái Hà Lan',
            ma_hang_hoa: 'CG0002',
            loai_hang_hoa: 'Sữa tươi',
            khoi_luong: '200 KG',
            kich_thuoc: '2 Khối',
            so_luong: '5 thùng',
        }
    ],
    1: [
        {
            key: 3,
            hinh_anh: '3.jpg',
            ten_hang_hoa: 'Sữa TH true milk',
            ma_hang_hoa: 'TH0003',
            loai_hang_hoa: 'Sữa tươi',
            khoi_luong: '400 KG',
            kich_thuoc: '4 Khối',
            so_luong: '4 thùng',
        },
        {
            key: 4,
            hinh_anh: '4.jpeg',
            ten_hang_hoa: 'Bột ngọt VEDAN',
            ma_hang_hoa: 'VD0004',
            loai_hang_hoa: 'Bột ngọt',
            khoi_luong: '200 KG',
            kich_thuoc: '3 Khối',
            so_luong: '3 thùng',
        }
    ],
    2: [
        {
            key: 5,
            hinh_anh: '5.jpg',
            ten_hang_hoa: 'Trà sữa dâu BENLY',
            ma_hang_hoa: 'TH0005',
            loai_hang_hoa: 'Trà sữa',
            khoi_luong: '400 KG',
            kich_thuoc: '6 Khối',
            so_luong: '6 thùng',
        }
    ],
    3: [
        {
            key: 6,
            hinh_anh: '5.jpg',
            ten_hang_hoa: 'Trà sữa dâu BENLY',
            ma_hang_hoa: 'TH0005',
            loai_hang_hoa: 'Trà sữa',
            khoi_luong: '200 KG',
            kich_thuoc: '2 Khối',
            so_luong: '2 thùng',
        }
    ],
    4: [
        {
            key: 7,
            hinh_anh: '1.jpg',
            ten_hang_hoa: 'Nước cam ép TEPPY',
            ma_hang_hoa: 'CE0001',
            loai_hang_hoa: 'Nước ép',
            khoi_luong: '400 KG',
            kich_thuoc: '1 Khối',
            so_luong: '4 thùng',
        },
        {
            key: 8,
            hinh_anh: '4.jpeg',
            ten_hang_hoa: 'Bột ngọt VEDAN',
            ma_hang_hoa: 'VD0004',
            loai_hang_hoa: 'Bột ngọt',
            khoi_luong: '100 KG',
            kich_thuoc: '1 Khối',
            so_luong: '1 thùng',
        }
    ],
}

const Product = () => {
    const match = useRouteMatch();
    const id = match?.params?.id;

    return (
        <Table rowSelection={null} columns={columns} dataSource={data_table_template[id]} />
    )
}

export default Product;