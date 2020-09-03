import React, { useState, useEffect } from 'react';
//antd
import { Table, Typography, Progress, Tag, Button, Skeleton } from 'antd';
import { ProfileOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//lib
import { useHistory } from 'react-router-dom';

const { Text, Title } = Typography;

const data = [
    {
        key: 0,
        ma_chuyen: 'FLICK-000',
        ngay_tao: '20:02 20/02/2020',
        ten_dia_diem: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
        so_diem_di_qua: 3,
        muc_do_toi_uu: 100,
        tong_trong_luong: '1.8 Tấn',
        tong_kich_thuoc: '17 Khối',
        ten_xe: 'THACO ',
        trong_tai: '2 Tấn',
        tieu_thu: '8 lít nhiên liệu/100km'
    },
    {
        key: 1,
        ma_chuyen: 'FLICK-111',
        ngay_tao: '20:02 08/04/2020',
        ten_dia_diem: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
        so_diem_di_qua: 2,
        muc_do_toi_uu: 100,
        tong_trong_luong: '0.7 Tấn',
        tong_kich_thuoc: '3 Khối',
        ten_xe: 'ISUZU ',
        trong_tai: '1 Tấn',
        tieu_thu: '6 lít nhiên liệu/100km'
    }
]

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
                    <br />
                    <Text type="secondary">{record.ngay_tao}</Text>
                </>
            ),
        },
        {
            title: "Loại xe phù hợp",
            dataIndex: "doi_xe",
            width: 170,
            render: (text, record) => (
                <>
                    <Text>{record.ten_xe}</Text>
                    <Text>{record.trong_tai}</Text>
                    <br />
                    <Text type="secondary">{record.tieu_thu}</Text>
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
                    <Tag color="orange">{record.tong_kich_thuoc}</Tag>
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
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" icon={<ProfileOutlined />} style={{ marginRight: 8 }}
                        onClick={() => { history.push(`/phantuyen/chitiet/${record.key}`) }}
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

export default Confirm;