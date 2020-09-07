import React, { memo, useReducer } from 'react';
//atnd
import { Typography, Checkbox, Radio, Table, Input, Row, Col, DatePicker } from 'antd';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';
import moment from 'moment';
//config
import { DATE_FORMAT } from '../../../../config/format';
//variables
import { TRUCK_SIZE } from '../../../../variables/truck';
//hook
import warehouseState from './warehouseState';
import useTable from './useTable';
import useSearch from './useSearch';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const SetupWarehouse = ({
    //var
    warehouse,
    priority_warehouse,
    priority_truck,
    selected_order_keys,
    //handle
    onChangePriorityWarehouse,
    onChangePriorityTruck,
    onChangeSelectedOrder
}) => {
    //hook
    const { initial_state, reducer_state } = warehouseState();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const {
        //table
        data_source,
        pagination,
    } = state;
    const { total_items, page_number, page_size } = pagination;

    const { columns, onRow, rowSelection } = useTable({ selected_order_keys, onChangeSelectedOrder });
    const { fetch_orders } = useSearch({ warehouse, dispatchState });

    const onChangeDate = (dates, dateStrings) => {
    }

    return (
        <div>
            <Title level={4}>{`Thiết lập định tuyến tại ${warehouse.warehouse_name}`}</Title>
            <div className={styles.setup}>
                <Text strong>{"Thiết lập tham số định tuyến"}</Text>
                <div className={classnames(styles.setup_content, 'flex-column')}>
                    <Checkbox checked={priority_warehouse} onChange={onChangePriorityWarehouse}>{"Ưu tiên dùng xe tại kho"}</Checkbox>
                    <Radio.Group onChange={onChangePriorityTruck} value={priority_truck}>
                        <Radio className={styles.radio} value={TRUCK_SIZE.LARGE}>
                            {"Ưu tiên xe có trọng tải lớn trước"}
                        </Radio>
                        <Radio className={styles.radio} value={TRUCK_SIZE.SMALL}>
                            {"Ưu tiên xe có trọng tải nhỏ trước"}
                        </Radio>
                    </Radio.Group>
                </div>
            </div>
            <Row gutter={[8, 8]} style={{ margin: '12px 0px 24px 0px' }}>
                <Col span={24}>
                    <Text strong style={{ marginBottom: 12 }}>{"Danh sách đơn hàng"}</Text>
                </Col>
                <Col span={24} className={classnames('flex-row', 'justify-between')}>
                    <Search
                        placeholder="Tìm kiếm đơn hàng"
                        onSearch={value => console.log(value)}
                        style={{ width: 400 }}
                    />
                    <RangePicker
                        defaultValue={[moment(new Date(), DATE_FORMAT), moment(new Date(), DATE_FORMAT)]}
                        format={DATE_FORMAT}
                        onChange={onChangeDate}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        rowKey='order_id'
                        columns={columns}
                        dataSource={data_source}
                        loading={fetch_orders}
                        pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                        onRow={onRow}
                        rowSelection={rowSelection}
                        scroll={{ y: 230 }} />
                </Col>
            </Row>
        </div >
    )
}

export default memo(SetupWarehouse);