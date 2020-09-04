import React, { memo, useCallback } from 'react';
//antd
import { Row, Col, Typography, Skeleton } from 'antd';
//lib
import classnames from 'classnames';
//components
import WarehouseItem from '../../components/WarehouseItem';
//redux
import { useSelector } from 'react-redux';
//hook
import useCommon from './useCommon';

const { Title } = Typography;

const Warehouses = ({ warehouse_id, handleChangeWarehouse }) => {
    //hook
    useCommon();
    const warehouse_reducer = useSelector(state => state.warehouse_reducer);
    const { warehouses, fetch_warehouses } = warehouse_reducer;

    const onChangeWarehouse = useCallback((value) => {
        handleChangeWarehouse(value);
    }, [handleChangeWarehouse]);

    return (
        <div>
            <Row>
                <Col span={24} className={classnames('flex-row', 'justify-between')} >
                    <Title level={4}>{"Chọn kho cần định tuyến"}</Title>
                </Col>
            </Row>
            {
                fetch_warehouses ? <Skeleton active /> :
                    <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                        {
                            warehouses &&
                            warehouses.map((item, key) => {
                                return <WarehouseItem
                                    key={key}
                                    warehouse={item}
                                    selected={warehouse_id === item.warehouse_id}
                                    onChangeWarehouse={onChangeWarehouse} />
                            })
                        }
                    </Row>
            }
        </div>
    )
}

export default memo(Warehouses);