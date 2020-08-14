import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//components
import Schedule from '../../components/Schedule';
import GoogleMap from '../../../../components/GoogleMap';
import Portal from '../../../../components/Portal';
//antd
import { Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
//lib
import { useHistory, useRouteMatch } from 'react-router-dom';

const data = [
    {
        steps: [
            {
                key: 1,
                title: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
                key: 2,
                title: 'KTX ĐH kinh tế quốc dân, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 03',
            },
            {
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
                key: 1,
                title: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
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
    return (
        <>
            <Row>
                <Col span={24}>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}  >
                    <div style={{ paddingRight: 16 }}>
                        <div id="google_detail" />
                        <Schedule id={id} data={data} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <GoogleMap id={id} data={data} />
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

PostDetail.Layout = BasicLayout;

export default PostDetail;