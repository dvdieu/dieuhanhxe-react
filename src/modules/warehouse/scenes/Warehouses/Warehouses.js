import React, { memo, useState, useCallback } from 'react';
//layout
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Row, Col, Button, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//lib
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
//components
import WarehouseItem from '../../components/WarehouseItem';

const { Title } = Typography;

const warehouses = [
    {
        id: 1,
        name: 'Kho 1'
    },
    {
        id: 2,
        name: 'Kho 2'
    },
    {
        id: 3,
        name: 'Kho 3'
    },
    {
        id: 4,
        name: 'Kho 4'
    },
]

const Warehouses = () => {
    const [selected, setSelected] = useState(0);
    //
    const history = useHistory();
    const onChangeWarehouse = useCallback((value) => {
        setSelected(value)
    }, [])

    const onClickCreateRoute = () => {
        history.push(`/warehouse/setup/${selected}`);
    }

    return (
        <div>
            <Row>
                <Col span={24} className={classnames('flex-row', 'justify-between')} >
                    <Title level={4}>{"Chọn kho cần định tuyến"}</Title>
                    <Button
                        disabled={selected === 0}
                        icon={<PlusCircleOutlined />}
                        type='primary'
                        onClick={onClickCreateRoute}>{"Tạo định tuyến"}</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                {
                    warehouses &&
                    warehouses.map((item, key) => {
                        return <WarehouseItem
                            key={key}
                            warehouse={item}
                            selected={selected === item.id}
                            onChangeWarehouse={onChangeWarehouse} />
                    })
                }
            </Row>
        </div>
    )
}

Warehouses.Layout = BasicLayout;

export default memo(Warehouses);