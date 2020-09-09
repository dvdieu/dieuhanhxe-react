import React, { useReducer, useCallback } from 'react';
//atnd
import { Drawer, Button, Row, Col, Input, Table } from 'antd';
//lib
import classnames from 'classnames';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
//hook
import useTable from './useTable';
import orderState from './orderState';
import useSearch from './useSearch';

const { Search } = Input;

const OrderDrawer = ({ visible, warehouse, direction_templates, current_direction, onClose, onSubmit }) => {
    //hook
    const { init_state, reducer_state } = orderState;
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const { data_source, selected_rows, is_compare } = state;
    const { columns, onRow, rowSelection } = useTable({ selected_rows, dispatchState });

    const { fetch_orders, handleSearch } = useSearch({ warehouse, direction_templates, current_direction, is_compare, dispatchState });

    const handleSubmit = () => {
        onSubmit(selected_rows);
    }

    const afterVisibleChange = useCallback((is_visible) => {
        if (is_visible) {
            handleSearch({
                keyword: '',
                from_date: moment().day(1),
                to_date: moment().day(8),
                urgency: true, in_day: true, normal: true
            });
        }
    }, [handleSearch])

    return (
        <Drawer
            title="Thêm đơn hàng vào tuyến"
            afterVisibleChange={afterVisibleChange}
            width={900}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose={true}
            footer={
                <div
                    style={{ textAlign: 'right', }} >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        {"Đóng"}
                    </Button>
                    <Button onClick={handleSubmit} type="primary" disabled={isEmpty(selected_rows)}>
                        {"Xác nhận"}
                    </Button>
                </div>
            }>
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Search />
                    </Col>
                    <Col span={12} className={classnames('flex-row', 'justify-end')}>
                        {/* <Button type='primary'>{"Tạo đơn hàng"}</Button> */}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Table
                            rowKey="order_id"
                            loading={fetch_orders}
                            columns={columns}
                            dataSource={data_source}
                            onRow={onRow}
                            rowSelection={rowSelection} />
                    </Col>
                </Row>
            </div>
        </Drawer>
    )
}

export default React.memo(OrderDrawer);