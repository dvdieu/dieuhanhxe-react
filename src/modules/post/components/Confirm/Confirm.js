import React, { useState, useEffect } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Typography, Progress, Tag, Button, Skeleton } from 'antd';
import { ProfileOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//lib
import { useHistory } from 'react-router-dom';

const { Text, Title } = Typography;

let data = [];
for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        ma_chuyen: `FLICK-123` + i,
        ngay_tao: '20:02 20/02/2020',
        ten_dia_diem: 'VINMART+66 ĐẶNG TIẾN ĐÔNG',
        so_diem_di_qua: 55,
        muc_do_toi_uu: 100,
        tong_trong_luong: '150KG',
        tong_kich_thuoc: '3 Khối',
    });
}

const Confirm = ({ rowSelection }) => {
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

    const history = useHistory();

    const columns = [
        {
            title: "Mã chuyến",
            dataIndex: "ma_chuyen",
            width: 170,
            render: (text, record) => (
                <>
                    <Text>{record.ma_chuyen}</Text>
                    <Text>{record.ngay_tao}</Text>
                </>
            ),
        },
        {
            title: "Loại xe phù hợp",
            dataIndex: "doi_xe",
            width: 170,
            render: (text, record) => (
                <>
                    <Text>THACO</Text>
                    <Text>2.5 Tấn</Text>
                </>
            ),
        },
        {
            title: "Số điểm đi qua",
            dataIndex: "so_diem_di_qua",
            width: 170,
            render: (text, record) => (
                <>
                    <Tag color="orange">{record.so_diem_di_qua}</Tag>
                </>
            ),
        },
        {
            title: "Tổng trọng lượng",
            dataIndex: "tong_trong_luong",
            width: 170,
            render: (text, record) => (
                <>
                    <Tag color="orange">{record.tong_trong_luong}</Tag>
                </>
            ),
        },
        {
            title: "Tổng kích thước",
            dataIndex: "tong_kich_thuoc",
            width: 170,
            render: (text, record) => (
                <>
                    <Tag color="orange">{"15 Khối"}</Tag>
                </>
            ),
        },
        {
            title: "Mức độ tối ưu",
            dataIndex: "muc_do_toi_uu",
            width: 170,
            render: (text, record) => (
                <>
                    <Progress percent={record.muc_do_toi_uu} size="small" showInfo={false} />
                </>
            ),
        },

        {
            title: '',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" icon={<ProfileOutlined />} style={{ marginRight: 8 }}
                        onClick={() => { history.push('/phantuyen/chitiet') }}
                    >
                        {"Xem bảng phân tuyến"}
                    </Button>
                    <Button type="secondary" icon={<EditOutlined />} style={{ marginRight: 8 }}>
                        {"Chỉnh sửa"}
                    </Button>
                    <Button danger icon={<DeleteOutlined />}>
                        {"Xóa"}
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <div>
            <Title level={4} type="secondary">{"Lịch trình di chuyển"}</Title>
            <Skeleton loading={loading} active avatar>
                <Table rowSelection={null} columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            </Skeleton>
        </div>
    )
}

Confirm.Layout = BasicLayout;

export default Confirm;