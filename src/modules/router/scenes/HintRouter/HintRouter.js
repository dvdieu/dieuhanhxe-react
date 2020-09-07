import React, { memo, useReducer } from 'react';
//antd
import { Row, Col, Typography, Button, Table, Affix, Checkbox, Skeleton } from 'antd';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';
//hook
import useTable from './useTable';
import hintState from './hintState';
import useCommon from './useCommon';
//components
import Step from '../../components/Step';
import GoogleMap from '../../../../components/GoogleMap';
//drawer
import TruckDrawer from '../TruckDrawer';
import OrderDrawer from '../OrderDrawer';

const { Title, Text } = Typography;

const truck_data = [
    {
        id: 1,
        type: 'normal',
        weight: 1.25,
        size: 15,
        max_weight: 0
    }
]

const expected_data = [
    {
        expected: 'Tổng quãng đường',
        value: '15.7',
        unit: 'km',
    },
    {
        expected: 'Tổng thời gian di chuyển',
        value: '38',
        unit: 'phút',
    }
]

const HintRouter = ({ origin, selectTruck }) => {
    //hook
    const { init_state, reducer_state } = hintState();
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const { truck_visible, order_visible,
        //directs
        direction_request,
        direction_templates,
        current_direction,
        waypoints,
        order_address,
        orders,
    } = state;
    const {
        handleCloseTruckDrawer,
        handleCloseOrderDrawer,
        handleOpenOrderDrawer,
        handleAddOrder,
        handleChangeCurrentDirection,
    } = useCommon({ dispatchState });

    const { truck_columns, expected_columns, order_columns } = useTable();

    const handleSelectTruck = () => {
        selectTruck({
            weight: current_direction.weight,
            size: current_direction.size,
            direction_name: current_direction.name
        });
    }

    return (
        <div className={classnames('flex-row')}>
            <Row gutter={[16, 16]} className={classnames('full-width', styles.route_setup)}>
                {/* start Bảng định tuyến */}
                <Col span={4}  >
                    <Affix offsetTop={88}>
                        <div className={classnames(styles.routes, styles.border)}>
                            <Title className={styles.routes_title} level={4}>{"Bảng định tuyến"}</Title>
                            <div className={styles.routes_content}>
                                {
                                    direction_templates &&
                                    direction_templates.map((item, key) => {
                                        const is_selected = (item?._id === current_direction?._id);
                                        return (
                                            <div key={key} className={classnames({
                                                [styles.routes_item]: true,
                                                'flex-row': true,
                                                'align-middle': true,
                                                'justify-between': true,
                                                [styles.routes_item_selected]: is_selected,
                                                [styles._unselected]: !is_selected
                                            })}
                                                onClick={() => { handleChangeCurrentDirection(item) }}>
                                                <Text className={classnames({ [styles.routes_item_selected_text]: is_selected })}>{item.name}</Text>
                                                {
                                                    is_selected ?
                                                        <Button type='success' onClick={handleSelectTruck}>{"Xác nhận"}</Button>
                                                        :
                                                        <Button type='link'>{"Sửa"}</Button>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Button block type='primary'>{"Tạo thêm tuyến mới"}</Button>
                        </div>
                    </Affix>
                </Col>
                {/* end Bảng định tuyến */}
                <Col span={20}>
                    {/*start Thiết lập định tuyến */}
                    <Row>
                        <Col span={12} >
                            <div className={styles.no_border}>
                                <Title className={styles.routes_title} level={4}>{"Thiết lập định tuyến"}</Title>
                                <Table columns={truck_columns} dataSource={truck_data} pagination={false} rowKey="id" />
                                <br />
                                <Table columns={expected_columns} dataSource={expected_data} pagination={false} rowKey="expected" />
                                <br />
                                <Checkbox >{"Tránh phà"}</Checkbox>
                                <br />
                                <Checkbox >{"Tránh cao tốc"}</Checkbox>
                                <br />
                                <Checkbox >{"Tránh trạm thu phí"}</Checkbox>
                                {/* Tuyến đường cần tránh */}
                                {/* <div className='flex-row' style={{ marginBottom: 12 }}>
                                    <LocationSearchInput
                                        placeholder='Nhập tuyến đường cần tránh'
                                        address={address}
                                        onChange={handleChangeAddress}
                                        onSelect={handleChangeAddress} />
                                    <Button
                                        type='primary'
                                        onClick={() => handleAddDodgeAddress({
                                            address,
                                            STT: dodge_address.length + 1
                                        })}>{"Thêm"}</Button>
                                </div>
                                <Table columns={address_columns} dataSource={dodge_address} pagination={false} rowKey="STT" /> */}

                            </div>
                        </Col>

                        {/*start Lộ trình */}
                        <Col span={12} className={styles.no_border}>
                            <div className={styles.border}>
                                <Title className={styles.routes_title} level={4}>{"Lộ trình"}</Title>
                                {
                                    direction_request ? <Skeleton active /> :
                                        <GoogleMap
                                            waypoints={waypoints}
                                            center={origin}
                                            origin={origin}
                                            destination={origin}
                                        />
                                }
                                <br />
                                <div style={{ maxHeight: 200, overflow: 'auto' }}>
                                    {
                                        direction_request ? <Skeleton active /> :
                                            <Step order_address={order_address} />
                                    }
                                </div>
                            </div>
                        </Col>
                        {/*end Lộ trình */}
                    </Row>
                    {/*end Thiết lập định tuyến */}
                    {/* start Danh sách đơn hàng */}
                    <Row gutter={[16, 16]} style={{ margin: '12px 0px 24px 0px' }}>
                        <Col span={8} className={classnames('flex-row', 'align-bottom')}>
                            <Text>{`Số đơn hàng trong tuyến: ${orders.length}`}</Text>
                        </Col>
                        <Col offset={8} span={8} className={classnames('flex-row', 'justify-end')}>
                            <Button type='primary' onClick={handleOpenOrderDrawer}>{"Thêm đơn hàng khác vào tuyến"}</Button>
                        </Col>
                        <Col span={24}>
                            <Table columns={order_columns} dataSource={orders} pagination={false} rowKey="_id" scroll={{ y: 400 }} />
                        </Col>
                    </Row>
                    {/* end Danh sách đơn hàng */}
                </Col>
            </Row>
            <TruckDrawer visible={truck_visible} onClose={handleCloseTruckDrawer} />
            <OrderDrawer visible={order_visible} onClose={handleCloseOrderDrawer} onSubmit={handleAddOrder} />
        </div>
    )
}

export default memo(HintRouter);