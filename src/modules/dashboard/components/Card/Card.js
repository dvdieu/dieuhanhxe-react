import React from 'react';
import {  Col, Typography } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';

const { Text } = Typography;
const Card = () => {
    return (
        <Col span={6}>
            <div style={{ borderRadius: 6, border: '1px solid #EDEDED', backgroundColor: '#fff', padding: '8px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 38, color: '#2A3F54', fontWeight: 500 }}>155</Text>
                    <YoutubeOutlined style={{ fontSize: 48 }} />
                </div>
                <Text style={{ fontSize: '1.5em' }} type='secondary'>
                    {"Đăng ký mới"}
                </Text>
                <br />
                <Text>{"Lorem ipsum psdea itgum rixt."}</Text>
            </div>
        </Col>
    )
}

export default Card;