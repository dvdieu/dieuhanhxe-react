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
import { useHistory } from 'react-router-dom';


const PostDetail = () => {
    const history = useHistory();
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}  >
                    <Schedule />
                </Col>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <GoogleMap />
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