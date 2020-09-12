import React, { memo, useReducer, useCallback } from 'react';
//antd
import { Row, Col, Typography, Button, Table, Affix, Checkbox, Skeleton } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
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

const HintRouter = ({
    warehouse,
    origin,
    direction_request,
    direction_templates,
    current_direction,
    waypoints,
    order_address,
    orders,
    selectTruck,
    handleChangeCurrentDirection,
    handleRemoveOrder,
    handleAddOrder }) => {
    //hook
    const { init_state, reducer_state } = hintState();
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const { truck_visible, order_visible, info_data, truck_data } = state;
    const {
        handleCloseTruckDrawer,
        handleCloseOrderDrawer,
        handleOpenOrderDrawer,
    } = useCommon({ current_direction, dispatchState });

    const { truck_columns, order_columns, info_columns } = useTable({ current_direction, handleRemoveOrder });

    const handleSelectTruck = () => {
        selectTruck({
            weight: current_direction.weight,
            size: current_direction.size,
            direction_name: current_direction.name
        })
    }

    const onSubmitAddOrder = useCallback((draft_orders) => {
        handleAddOrder({ draft_orders, current_direction });
        handleCloseOrderDrawer();
    }, [current_direction, handleAddOrder, handleCloseOrderDrawer])

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
                                        const { confirm } = item;
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
                                                {
                                                    confirm && <CheckCircleOutlined />
                                                }
                                                <Text className={classnames({ [styles.routes_item_selected_text]: is_selected })}>{item.name}</Text>
                                                {
                                                    is_selected ?
                                                        <Button type='success' onClick={handleSelectTruck}>{"Chọn xe"}</Button>
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
                                <Table columns={info_columns} dataSource={info_data} pagination={false} rowKey="id" />
                                <br />
                                {
                                    truck_data.length > 0 &&
                                    <>
                                        <Table columns={truck_columns} dataSource={truck_data} pagination={false} rowKey="license_plates" />
                                        <br />
                                    </>
                                }
                                <Checkbox >{"Tránh phà"}</Checkbox>
                                <br />
                                <Checkbox >{"Tránh cao tốc"}</Checkbox>
                                <br />
                                <Checkbox >{"Tránh trạm thu phí"}</Checkbox>
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
                        <Col span={8}></Col>
                        <Col offset={8} span={8} className={classnames('flex-column', 'align-bottom', 'justify-end')}>
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
            <OrderDrawer
                visible={order_visible}
                warehouse={warehouse}
                direction_templates={direction_templates}
                current_direction={current_direction}
                onClose={handleCloseOrderDrawer}
                onSubmit={onSubmitAddOrder} />
        </div>
    )
}

export default memo(HintRouter);