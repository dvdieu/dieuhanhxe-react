import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Row, Input, Typography } from 'antd';
//components
import DriverCard from '../../components/DriverCard';

const { Search } = Input;
const { Title } = Typography;

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
    });
}

const Drivers = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <Title level={2}>Tài xế</Title>
                    <Search
                    size="large"
                    style={{ width: 400 }}
                    placeholder="Tìm kiếm"
                    onSearch={value => console.log(value)}
                    enterButton />
            </div>
            <Row gutter={[16, 16]}>
                {
                    data.map(item => {
                        return (
                            <DriverCard key={item.key} />
                        )
                    })
                }
            </Row>
        </>
    )
}

Drivers.Layout = BasicLayout;

export default Drivers;
