import React, { useState } from 'react';
//components
import Schedule from '../../components/Schedule';
import GoogleMap from '../../../../components/GoogleMap';
import Portal from '../../../../components/Portal';
//antd
import { Row, Col, Button, Table, Avatar, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
//lib
import { useHistory, useRouteMatch } from 'react-router-dom';

const { Text, Title } = Typography;

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

const data = [
    {
        steps: [
            {
                id: 0,
                key: 1,
                title: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
                id: 1,
                key: 2,
                title: 'KTX ĐH kinh tế quốc dân, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 03',
            },
            {
                id: 2,
                key: 3,
                title: 'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Hà Nội',
                description: 'Kiện hàng số - 04 - 05',
            },
        ],
        location: [
            // { lat: 21.017319, lng: 105.855285 },
            { lat: 20.99814, lng: 105.846581 },
            // { lat: 21.036471, lng: 105.919320 },
        ],
        center: { lat: 20.998310, lng: 105.846550 },
        origin: { lat: 21.017319, lng: 105.855285 },
        destination: { lat: 21.036471, lng: 105.919320 },
    },
    {
        steps: [
            {
                id: 3,
                key: 1,
                title: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
                id: 4,
                key: 2,
                title: '152 Phố Vọng, phường Phương Liệt, quận Thanh Xuân, Hà Nội',
                description: 'Kiện hàng số - 03',
            },
        ],
        location: [
            // { lat: 21.003038, lng: 105.858549 },
            // { lat: 20.996382, lng: 105.842931 },
        ],
        center: { lat: 20.996382, lng: 105.842931 },
        origin: { lat: 21.002854, lng: 105.858518 },
        destination: { lat: 20.996382, lng: 105.842931 },
    }
]

const PostDetail = () => {
    const history = useHistory();
    const match = useRouteMatch();
    const id = match?.params?.id;

    const [position, setPosition] = useState(data[id]?.steps[0]?.id);

    const onChangePosition = position => {
        setPosition(position);
    }

    return (
        <>
            <Row>
                <Col span={24}>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}  >
                    <div style={{ paddingRight: 16 }}>
                        <div id="google_detail" />
                        <Schedule id={id} data={data} position={position} changePosition={onChangePosition} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <GoogleMap id={id} data={data} />
                </Col>
                <Col span={24} style={{ marginTop: 24 }}>
                    <Title level={3}>{"Danh sách hàng hóa"}</Title>
                    <Table rowSelection={null} columns={columns} dataSource={data_table_template[position]} scroll={{ x: 500 }} />
                </Col>
            </Row>
            <Portal id="root_footer">
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size='large' onClick={() => { history.goBack() }} icon={<ArrowLeftOutlined />}>{"Trở về"}</Button>
                </div>
            </Portal>
        </>
    )
}

export default PostDetail;