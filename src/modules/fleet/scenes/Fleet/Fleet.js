import React, { memo } from 'react';
import { Row, Col, Typography, Button, Avatar } from 'antd';
import { CalendarOutlined, EditOutlined, DeleteOutlined, HomeOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';
//lib
import i18n from '../../../../libs/i18n';
import { GlassMagnifier } from "react-image-magnifiers";

const { Title, Text } = Typography;

const Fleet = memo(() => {
    return (
        <div>
            <Row>
                <Col span={8}>
                    <div style={{ padding: 8, display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 8 }}>
                            <Avatar shape='square' size={50} style={{ marginBottom: 8 }} />
                            <Avatar shape='square' size={50} style={{ marginBottom: 8 }} />
                            <Avatar shape='square' size={50} />
                        </div>
                        <GlassMagnifier
                            imageSrc={require('../../../../assets/images/trucks/xe.jpg')}
                            imageAlt="Example"
                            largeImageSrc={require('../../../../assets/images/trucks/xe.jpg')} // Optional
                            square={true}
                        />
                    </div>
                </Col>
                <Col span={16}>
                    <div>
                        <Row>
                            <Col span={12}>
                                <Title level={4}>THACO TOWNER 800</Title>
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button icon={<CalendarOutlined />} type='link' style={{ color: 'blue' }}>
                                    {i18n.t('Lịch trình')}
                                </Button>
                                <Button icon={<EditOutlined />} type='link' style={{ color: 'green' }}>
                                    {i18n.t('Chỉnh sửa')}
                                </Button>
                                <Button icon={<DeleteOutlined />} type='link' danger>
                                    {i18n.t('Xóa')}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <Row>
                                    <Col span={8}><Text type='secondary'>Biển số</Text></Col>
                                    <Col span={12}><Text >29M1 - 15678</Text></Col>
                                    <Col span={8}><Text type='secondary'>Tên xe</Text></Col>
                                    <Col span={12}><Text >THACO TOWNER 800</Text></Col>
                                    <Col span={8}><Text type='secondary'>Hãng xe</Text></Col>
                                    <Col span={12}><Text >THACO</Text></Col>
                                    <Col span={8}><Text type='secondary'>Loại xe</Text></Col>
                                    <Col span={12}><Text >Lạnh</Text></Col>
                                    <Col span={8}><Text type='secondary'>Trọng tải</Text></Col>
                                    <Col span={12}><Text >2.5 tấn</Text></Col>
                                    <Col span={8}><Text type='secondary'>Kích thước</Text></Col>
                                    <Col span={12}><Text >5 khối</Text></Col>
                                </Row>
                                <Row style={{ marginTop: 12 }}>
                                    <Col span={16} style={{ borderRadius: 6, backgroundColor: '#F3FAF3', padding: 8 }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <CarOutlined style={{ fontSize: 40, color: '#38843B', marginRight: 8 }} />
                                            <div>
                                                <Text style={{ color: '#009900' }}>Đang giao đơn hàng HD0001</Text>
                                                <br />
                                                <Text style={{ color: '#009900', fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer', textDecorationLine: 'underline' }}>Xem chi tiết</Text>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24} style={{ border: '1px solid gray', width: '100%', padding: 8, borderRadius: 6 }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <HomeOutlined style={{ fontSize: 40, color: 'orange', marginRight: 8 }} />
                                            <div>
                                                <Text strong>Kho 001</Text>
                                                <br />
                                                <Text>Hiện có 20 xe tải</Text>
                                            </div>
                                        </div>
                                        <div style={{ margin: '8px 0' }}>
                                            <Text >20 Trần Hưng Đạo, Hàng Bài, Hoàn Kiếm, Hà Nội</Text>
                                        </div>
                                        <Button type='primary' block>Xem kho</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} style={{ border: '1px solid gray', width: '100%', padding: 8, borderRadius: 6, marginTop: 12 }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <UserOutlined style={{ fontSize: 40, color: 'orange', marginRight: 8 }} />
                                            <div>
                                                <Text strong>Nguyễn Văn A</Text>
                                                <br />
                                                <Text>19/08/1980</Text>
                                            </div>
                                        </div>
                                        <div style={{ margin: '8px 0' }}>
                                            <Text >{"Chuyên chạy các xe có trọng tải < 3 tấn"}</Text>
                                        </div>
                                        <Button type='primary' block>Xem thông tin</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
})

export default Fleet;