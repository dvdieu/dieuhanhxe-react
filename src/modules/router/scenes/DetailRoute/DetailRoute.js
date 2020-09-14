import React, { memo, useReducer, useCallback } from 'react';
//antd
import { Row, Col, Typography, Button, Table, Affix, Checkbox, Skeleton } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';
//hook
import { init_state, reducer_state } from './detailState';
import useCommon from './useCommon';
import useTable from './useTable';
//components
import Step from '../../components/Step';
import GoogleMap from '../../../../components/GoogleMap';
import ScheduleDetail from '../ScheduleDetail';

const { Title, Text } = Typography;

const DetailRoute = () => {
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const {
        truck_data,
        info_data,
        fetch,
        step,
        is_edit,
        //google
        origin,
        waypoints,
        order_address,
        //order
        orders,
        //direct
        truck,
        event,
        direct,
    } = state;
    const { goBack, handleChangeSchedule, handleSubmit } = useCommon({ dispatchState, direct, truck, event });
    const { truck_columns, info_columns, order_columns } = useTable({ dispatchState });

    return (
        <div>
            {
                step === 0 &&
                <div className={classnames('flex-row')}>
                    <Row gutter={[16, 16]} className={classnames('full-width', styles.route_setup)}>
                        <Col span={24}>
                            {/*start Thiết lập định tuyến */}
                            <Row>
                                <Col span={12} >
                                    {
                                        fetch ? <>
                                            <Skeleton active />
                                            <Skeleton active />
                                        </> :
                                            <div className={styles.no_border}>
                                                <Title className={styles.routes_title} level={4}>{"Thiết lập định tuyến"}</Title>
                                                <Table columns={info_columns} dataSource={info_data} pagination={false} rowKey="id" />
                                                <br />
                                                <Table columns={truck_columns} dataSource={truck_data} pagination={false} rowKey="license_plates" />
                                            </div>
                                    }
                                </Col>
                                {/*start Lộ trình */}
                                <Col span={12} className={styles.no_border}>
                                    <div className={styles.border}>
                                        <Title className={styles.routes_title} level={4}>{"Lộ trình"}</Title>
                                        {
                                            fetch ? <Skeleton active /> :
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
                                                fetch ? <Skeleton active /> :
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
                                    <Button type='primary'>{"Thêm đơn hàng khác vào tuyến"}</Button>
                                </Col>
                                <Col span={24}>
                                    <Table columns={order_columns} dataSource={orders} pagination={false} rowKey="_id" scroll={{ y: 400 }} />
                                </Col>
                            </Row>
                            {/* end Danh sách đơn hàng */}
                        </Col>
                    </Row>
                // {/* <OrderDrawer
                //     visible={order_visible}
                //     warehouse={warehouse}
                //     direction_templates={direction_templates}
                //     current_direction={current_direction}
                //     onClose={handleCloseOrderDrawer}
            //     onSubmit={onSubmitAddOrder} /> */}
                    {
                        is_edit &&
                        <div
                            id="root_footer"
                            className={styles.footer}
                        >
                            <div className={classnames('flex-row', 'justify-end')} style={{ padding: `${is_edit ? '12px' : '0px'} 0px` }}>
                                <Button type='default' style={{ marginRight: 12 }}>{"Hủy"}</Button>
                                <Button type='primary' onClick={handleSubmit}>{"Lưu"}</Button>
                            </div>
                        </div>
                    }
                </div>
            }
            {
                step === 1 &&
                <ScheduleDetail
                    truck={truck}
                    event={event}
                    goBack={goBack}
                    handleChangeSchedule={handleChangeSchedule} />
            }
        </div>
    )
}

export default DetailRoute;