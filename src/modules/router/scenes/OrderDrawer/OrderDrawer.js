import React, { useReducer } from 'react';
//atnd
import { Drawer, Button, Row, Col, Input, Table } from 'antd';
//lib
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
//hook
import useTable from './useTable';
import orderState from './orderState';


const { Search } = Input;

const OrderDrawer = ({ visible, onClose, onSubmit }) => {
    //hook
    const { init_state, reducer_state } = orderState;
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const { data_source, selected_rows } = state;
    const { columns, onRow, rowSelection } = useTable({ selected_rows, dispatchState });

    const handleSubmit = () => {
        onSubmit(selected_rows);
    }

    return (
        <Drawer
            title="Thêm đơn hàng vào tuyến"
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            destroyOnClose={true}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
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
                            rowKey="id"
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