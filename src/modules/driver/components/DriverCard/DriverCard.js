import React from 'react';

//antd
import { Row, Col, Typography, Avatar, Button } from 'antd';
import { WechatOutlined, InfoCircleOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';

const { Text } = Typography;

const DriverCard = () => {
    return (
        <Col xs={8} style={{ padding: 8 }}>
            <div style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: 16 }}>
                <Row>
                    <Text style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 16 }} >{"TÀI XẾ KINH NGHIỆM"}</Text>
                </Row>
                <Row>
                    <Col xs={16}>
                        <Text style={{ fontWeight: 400, fontSize: 18 }} >{"NGUYỄN VĂN SƠN"}</Text>
                        <br />
                        <Text type='secondary'>{"Chuyên chạy các loại xe trong tải > 2 tấn"}</Text>
                        <br />
                        <HomeOutlined />
                        <Text>{" Address: "}</Text>
                        <Text type='secondary'>{"Hàng buồm"}</Text>
                        <br />
                        <PhoneOutlined />
                        <Text>{" Phone: "}</Text>
                        <Text type='secondary'>{"0964222806"}</Text>
                    </Col>
                    <Col xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Avatar size={128} src={require('../../../../assets/images/avatar.png')} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 12 }}>
                    <Col xs={12}>
                        <Text>{"4.0"}</Text>
                    </Col>
                    <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='default' style={{ marginRight: 8, backgroundColor: '#3FB091', color: '#fff' }} icon={<WechatOutlined />}>
                            {"Chat"}
                        </Button>
                        <Button type='default' style={{ backgroundColor: '#0069D9', color: '#fff' }} icon={<InfoCircleOutlined />}>
                            {"Thông tin"}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default DriverCard;