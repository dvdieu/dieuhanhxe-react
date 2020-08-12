import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Table, Typography, Avatar, Progress, Tag, Button } from 'antd';
import { UserOutlined, ProfileOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
//lib
import { useHistory } from 'react-router-dom';

const { Text, Title } = Typography;

const data = [];
for (let i = 0; i < 2; i++) {
    data.push({
        key: i,
        ma_chuyen: `FLICK-123` + i,
        ngay_tao: '20:02 20/02/2020',
        ten_dia_diem: 'VINMART+66 ĐẶNG TIẾN ĐÔNG',
        tinh_trang: `Chưa phân tuyến`,
        tong_trong_luong: '150KG',
        tong_kich_thuoc: '3 Khối',
    });
}

const Confirm = ({ rowSelection }) => {
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
            title: "Đội xe",
            dataIndex: "doi_xe",
            width: 170,
            render: (text, record) => (
                <>
                    <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: 8 }} />
                    <Avatar size="large" icon={<UserOutlined />} />
                </>
            ),
        },
        {
            title: "Tiến độ",
            dataIndex: "tien_do",
            width: 170,
            render: (text, record) => (
                <>
                    <Progress percent={100} size="small" showInfo={false} />
                </>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            width: 170,
            render: (text, record) => (
                <>
                    <Tag color="orange">{"Đang di chuyển"}</Tag>
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
            <Table rowSelection={null} columns={columns} dataSource={data} />
        </div>
    )
}

Confirm.Layout = BasicLayout;

export default Confirm;