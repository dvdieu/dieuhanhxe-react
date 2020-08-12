import React, { useState } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table } from 'antd';

const columns = [
    {
        title: 'Mã thống kê',
        dataIndex: 'ma_thong_ke',
    },
    {
        title: 'Tên thống kê',
        dataIndex: 'ten_thong_ke',
    },
    {
        title: 'Loại xe',
        dataIndex: 'loai_xe',
    },
    {
        title: 'Trọng tải',
        dataIndex: 'trong_tai',
    },
    {
        title: 'Kích thước',
        dataIndex: 'kich_thuoc',
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
const carCategories = ["THACO", "ISUZU", "JACK"]
for (let i = 0; i < 46; i++) {
    let typeCar = carCategories[Math.floor(Math.random() * carCategories.length)];
    data.push({
        key: i,
        ma_thong_ke: `29M1-5555` + i,
        ten_thong_ke: typeCar,
        loai_xe: typeCar,
        trong_tai: parseFloat(1 + Math.random() * (5 - 1)).toFixed(2) + ' tấn',
        kich_thuoc: Math.floor(Math.random() * 3 + 1.5) + ' khối'
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