import React, { useReducer } from 'react';
//antd
import { Drawer, Button, Input, Row, Col, Table } from 'antd';
//lib
import classnames from 'classnames';
//hook
import useTable from './useTable';
import truckState from './truckState';

const { Search } = Input;

const TruckDrawer = ({ visible, onClose }) => {
    //hook
    const { initial_state, reducer_state } = truckState();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const { data_source, pagination, selected_rows } = state;
    const { columns, rowSelection, handleTableChange } = useTable({ selected_rows, dispatchState });

    const { total_items, page_number, page_size } = pagination;

    return (
        <Drawer
            title="Chọn xe"
            width={720}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        {"Đóng"}
                    </Button>
                    <Button onClick={onClose} type="primary">
                        {"Xác nhận"}
                    </Button>
                </div>
            }
        >
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Search />
                    </Col>
                    <Col span={12} className={classnames('flex-row', 'justify-end')}>
                        <Button type='primary'>{"Tạo xe"}</Button>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={data_source}
                            pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                            rowKey='license_plates'
                            rowSelection={rowSelection}
                            onChange={handleTableChange}
                        />
                    </Col>
                </Row>
            </div>
        </Drawer>
    )
}

export default React.memo(TruckDrawer);