import React, { useReducer } from 'react';
//antd
import { Drawer, Button, Input, Row, Col, Table } from 'antd';
//lib
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
//hook
import useTable from './useTable';
import truckState from './truckState';
import useSearch from './useSearch';
import useCreateTruck from './useCreateTruck';
//components
import CreateTruckDrawer from '../../../../components/CreateTruckDrawer';

const { Search } = Input;

const TruckDrawer = ({ visible, onClose }) => {
    //hook
    const { initial_state, reducer_state } = truckState();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const {
        data_source,
        pagination,
        selected_rows,
        //
        create_truck_visible
    } = state;
    const { fetch_fleets, handleSearchFleet } = useSearch({ dispatchState });
    const { columns, rowSelection, handleTableChange } = useTable({ selected_rows, dispatchState, handleSearchFleet });

    const { total_items, page_number, page_size } = pagination;

    const { handleCloseTruckDrawer, handleOpenTruckDrawer, handleCreateTruck } = useCreateTruck({ dispatchState });

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
                    <Button onClick={onClose} disabled={isEmpty(selected_rows)} type="primary">
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
                        <Button type='primary' onClick={handleOpenTruckDrawer}>{"Tạo xe"}</Button>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={data_source}
                            pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                            rowKey='license_plates'
                            rowSelection={rowSelection}
                            onChange={handleTableChange}
                            scroll={{ y: 400 }}
                            loading={fetch_fleets}
                        />
                    </Col>
                </Row>
            </div>
            <CreateTruckDrawer
                visible={create_truck_visible}
                onClose={handleCloseTruckDrawer}
                onSubmit={handleCreateTruck} />
        </Drawer>
    )
}

export default React.memo(TruckDrawer);