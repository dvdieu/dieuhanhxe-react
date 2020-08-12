import React, { useState } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table } from 'antd';

const columns = [
    {
        title: 'Mã hàng hóa',
        dataIndex: 'ma_hang_hoa',
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
        render: () => (
            <a href='/'>Chi tiết</a>
        ),
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        ma_hang_hoa: `121000040` + i,
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
}

Merchandises.Layout = BasicLayout;

export default Merchandises;