import React, { useState } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Avatar } from 'antd';

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
        title: 'Chi nhánh',
        dataIndex: 'chi_nhanh',
    },
    {
        title: 'Mã VTHH',
        dataIndex: 'ma_hang_hoa',
    },
    {
        title: 'Tên VTHH',
        dataIndex: 'ten_hang_hoa',
    },
    {
        title: 'Loại VTHH',
        dataIndex: 'loai_hang_hoa',
    },
    {
        title: 'Số lượng tồn',
        dataIndex: 'so_luong_ton',
    },
    {
        title: 'Số lượng tồn chuyển đổi',
        dataIndex: 'so_luong_ton_chuyen_doi',
    },
    {
        title: 'Tỷ lệ chuyển đổi khác',
        dataIndex: 'ty_le_chuyen_doi',
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'ngay_nhap',
    },
    {
        title: 'Tình trạng',
        dataIndex: 'tinh_trang',
    },
    {
        title: 'Xe',
        dataIndex: 'xe',
    },
    {
        title: 'Nhân viên nhập',
        dataIndex: 'nhan_vien_nhap',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
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
        chi_nhanh: _CHINHANH[Math.floor(Math.random() * _CHINHANH.length)],
        ten_hang_hoa: _TENVTHH[Math.floor(Math.random() * _CHINHANH.length)],
        ma_hang_hoa: _IDVTHH[Math.floor(Math.random() * _CHINHANH.length)] + i,
        loai_hang_hoa: _LOAIVATTUHH[Math.floor(Math.random() * _CHINHANH.length)],
        so_luong_ton: 0,
        so_luong_ton_chuyen_doi: 0,
        ty_le_chuyen_doi: 0,
        ngay_nhap: '20:00 20/10/2020',
        tinh_trang: `Chưa phân tuyến`,
        xe: 'Đang đợi xếp',
        nhan_vien_nhap: 'Huy',
    });
}

const Merchandises = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    )
}

Merchandises.Layout = BasicLayout;

export default Merchandises;