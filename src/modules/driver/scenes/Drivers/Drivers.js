import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';

//antd
import { Row, Col } from 'antd';

const Drivers = () => {
    return (
        <Row gutter={8}>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ backgroundColor: 'green' }}>
                {"col"}
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ backgroundColor: 'red' }}>
                {"col"}
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} style={{ backgroundColor: 'green' }}>
                {"col"}
            </Col>
        </Row>
    )
}

Drivers.Layout = BasicLayout;

export default Drivers;
