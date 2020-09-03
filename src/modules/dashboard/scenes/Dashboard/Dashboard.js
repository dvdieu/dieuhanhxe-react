import React from 'react';
import { Row, Col, Typography, DatePicker, List, Avatar } from 'antd';
//components
import Card from '../../components/Card';
import AreaChart from '../../components/AreaChart';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const data = [
    {
        title: 'Ms. Mary Jane 1',
    },
    {
        title: 'Ms. Mary Jane 2',
    },
    {
        title: 'Ms. Mary Jane 3',
    },
    {
        title: 'Ms. Mary Jane 4',
    },
    {
        title: 'Ms. Mary Jane 5',
    },
];

const Dashboard = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Card />
                <Card />
                <Card />
                <Card />
            </Row>
            <Row gutter={[16, 16]} style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: '8px 16px' }}>
                <Col span={24}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24 }}>Transaction Summary</Text>
                        <RangePicker />
                    </div>
                </Col>
                <Col span={16}>
                    <AreaChart />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 30px' }}>
                        <div>
                            <Text>{"Tổng số chuyến đã thực hiện"}</Text>
                            <br />
                            <Text strong>{"231,809"}</Text>
                        </div>
                        <div>
                            <Text>{"Total Revenue"}</Text>
                            <br />
                            <Text strong>{"231,809"}</Text>
                        </div>
                        <div>
                            <Text>{"Tổng số chuyến đã thực hiện"}</Text>
                            <br />
                            <Text strong>{"231,809"}</Text>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <Text style={{ fontSize: 20 }}>{"Top Profiles"} </Text>
                    <br />
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={require('../../../../assets/images/avatar.png')} />}
                                    title={<a href="https://google.com">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <div style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: '8px 16px' }}>
                        <Text style={{ fontSize: 20 }}>{"Top Profiles"} </Text>
                        <br />
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={require('../../../../assets/images/avatar.png')} />}
                                        title={<a href="https://google.com">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: '8px 16px' }}>
                        <Text style={{ fontSize: 20 }}>{"Top Profiles"} </Text>
                        <br />
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={require('../../../../assets/images/avatar.png')} />}
                                        title={<a href="https://google.com">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: '8px 16px' }}>
                        <Text style={{ fontSize: 20 }}>{"Top Profiles"} </Text>
                        <br />
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={require('../../../../assets/images/avatar.png')} />}
                                        title={<a href="https://google.com">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Dashboard;