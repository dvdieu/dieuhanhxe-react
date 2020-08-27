import React, { memo, useState, useEffect, useRef, useReducer } from 'react';
//layout
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Row, Col, Typography, Button, Table, Input } from 'antd';
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

const { Title, Text } = Typography;
const { Search } = Input

const routes = [
    { id: 1, name: 'Tuyến 001' },
    { id: 2, name: 'Tuyến 002' },
    { id: 3, name: 'Tuyến 003' },
    { id: 4, name: 'Tuyến 004' },
]

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

const address_data = [
    {
        STT: 1,
        address: '25 Trần Xuân Soạn'
    },
    {
        STT: 2,
        address: '30 Đinh Tiên Hoàng'
    }
]

const google_data = [
    {
        steps: [
            {
                id: 0,
                key: 1,
                title: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
                id: 1,
                key: 2,
                title: 'KTX ĐH kinh tế quốc dân, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 03',
            },
            {
                id: 2,
                key: 3,
                title: 'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Hà Nội',
                description: 'Kiện hàng số - 04 - 05',
            },
        ],
        location: [
            // { lat: 21.017319, lng: 105.855285 },
            { lat: 20.99814, lng: 105.846581 },
            // { lat: 21.036471, lng: 105.919320 },
        ],
        center: { lat: 20.998310, lng: 105.846550 },
        origin: { lat: 21.017319, lng: 105.855285 },
        destination: { lat: 21.036471, lng: 105.919320 },
    },
    {
        steps: [
            {
                id: 3,
                key: 1,
                title: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
                description: 'Kiện hàng số - 01 - 02',
            },
            {
                id: 4,
                key: 2,
                title: '152 Phố Vọng, phường Phương Liệt, quận Thanh Xuân, Hà Nội',
                description: 'Kiện hàng số - 03',
            },
        ],
        location: [
            // { lat: 21.003038, lng: 105.858549 },
            // { lat: 20.996382, lng: 105.842931 },
        ],
        center: { lat: 20.996382, lng: 105.842931 },
        origin: { lat: 21.002854, lng: 105.858518 },
        destination: { lat: 20.996382, lng: 105.842931 },
    }
]

const order_data = [
    {
        id: 1,
        address: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
        quantity: 15,
        weight: 1.25,
        size: 15,
        warning: ''
    },
    {
        id: 2,
        address: 'KTX ĐH kinh tế quốc dân, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội',
        quantity: 10,
        weight: 1,
        size: 10,
        warning: ''
    },
    {
        id: 3,
        address: 'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Hà Nội',
        quantity: 5,
        weight: 0.5,
        size: 5,
        warning: ''
    },
    {
        id: 4,
        address: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
        quantity: 10,
        weight: 1.5,
        size: 15,
        warning: 'Quá trọng tải'
    }
]

const HintRouter = () => {
    const [route, setRoute] = useState(1);

    //hook
    const { init_state, reducer_state } = hintState();
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const { truck_visible } = state;
    const { handleCloseTruckDrawer, handleOpenTruckDrawer } = useCommon({ dispatchState });
    const { truck_columns, expected_columns, address_columns, order_columns } = useTable({ handleOpenTruckDrawer });

    const handleChangeRouteItem = item => {
        setRoute(item.id);
    }

    const [is_sticky, setSticky] = useState(false);
    const ref = useRef(null);

    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (
        <div className={classnames('flex-row')}>
            <Row gutter={[16, 16]} className={classnames('full-width', styles.route_setup)}>
                {/* start Bảng định tuyến */}
                <Col span={4} className={`sticky-wrapper${is_sticky ? ' sticky' : ''}`} ref={ref}>
                    <div className={classnames(styles.routes, styles.border, 'sticky-inner')}>
                        <Title className={styles.routes_title} level={4}>{"Bảng định tuyến"}</Title>
                        <div className={styles.routes_content}>
                            {
                                routes &&
                                routes.map((item, key) => {
                                    const is_selected = (item.id === route);
                                    return (
                                        <div key={key} className={classnames({
                                            [styles.routes_item]: true,
                                            'flex-row': true,
                                            'align-middle': true,
                                            [styles.routes_item_selected]: is_selected,
                                            [styles._unselected]: !is_selected
                                        })}
                                            onClick={() => { handleChangeRouteItem(item) }}>
                                            <Text className={classnames({ [styles.routes_item_selected_text]: is_selected })}>{item.name}</Text>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Button block type='primary'>{"Tạo thêm tuyến mới"}</Button>
                    </div>
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
                                <div className='flex-row' style={{ marginBottom: 12 }}>
                                    <Input placeholder='Nhập tuyến đường cần tránh' />
                                    <Button type='default'>{"Thêm"}</Button>
                                </div>
                                <Table columns={address_columns} dataSource={address_data} pagination={false} rowKey="STT" />

                            </div>
                        </Col>

                        {/*start Lộ trình */}
                        <Col span={12} className={styles.no_border}>
                            <div className={styles.border}>
                                <Title className={styles.routes_title} level={4}>{"Lộ trình"}</Title>
                                <GoogleMap id={'1'} data={google_data} />
                                <br />
                                <div style={{ maxHeight: 200, overflow: 'auto' }}>
                                    <Step />
                                </div>
                            </div>
                        </Col>
                        {/*end Lộ trình */}
                    </Row>
                    {/*end Thiết lập định tuyến */}
                    {/* start Danh sách đơn hàng */}
                    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            <Search />
                        </Col>
                        <Col offset={8} span={8} className={classnames('flex-row', 'justify-end')}>
                            <Button type='primary'>{"Thêm đơn hàng khác vào tuyến"}</Button>
                        </Col>
                        <Col span={24}>
                            <Table columns={order_columns} dataSource={order_data} pagination={false} rowKey="id" scroll={{ y: 400 }} />
                        </Col>
                    </Row>
                    {/* end Danh sách đơn hàng */}
                </Col>
            </Row>
            <TruckDrawer visible={truck_visible} onClose={handleCloseTruckDrawer} />
        </div>
    )
}

HintRouter.Layout = BasicLayout;

export default memo(HintRouter);