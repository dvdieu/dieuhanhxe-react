import React, { memo, useReducer } from 'react';
//atnd
import { Typography, Checkbox, Radio, Table, Input, Row, Col, DatePicker, Button } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
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
import useCommon from './useCommon';

const { Title, Text } = Typography;
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
        //filter
        keyword,
        from_date,
        to_date,
        urgency,
        in_day,
        normal,
    } = state;
    const { total_items, page_number, page_size } = pagination;

    const { columns, onRow, rowSelection } = useTable({ selected_order_keys, onChangeSelectedOrder });
    const { fetch_orders, handleSearch } = useSearch({
        warehouse,
        keyword,
        from_date,
        to_date,
        urgency,
        in_day,
        normal,
        dispatchState
    });
    const {
        handleChangeKeyword,
        handleChangeFromDate,
        handleChangeToDate,
        handleChangeUrgency,
        handleChangeInDay,
        handleChangeNormal,
    } = useCommon({ dispatchState });

    const onChangeDate = (value, dateString) => {
        handleChangeFromDate(moment(value[0]));
        handleChangeToDate(moment(value[1]))
    }

    const onSubmitFilter = () => {
        handleSearch({ keyword, from_date, to_date, urgency, in_day, normal });
    }

    return (
        <div>
            <Row>
                <Col span={4}>
                    <div className={classnames(styles['filter-container'], 'flex-column')}>
                        <Input style={{ width: '100%' }} addonAfter={<SearchOutlined />} placeholder="Tìm kiếm đơn hàng" onChange={handleChangeKeyword} value={keyword} />
                        <div className={classnames(styles['filter-content'], 'flex-column', 'justify-between')}>
                            <div className='flex-column'>
                                <div>
                                    <FilterOutlined style={{ marginRight: 8 }} />
                                    <Text strong>{"Bộ lọc"}</Text>
                                </div>
                                <Text strong>{"Độ ưu tiên"}</Text>
                                <Checkbox checked={urgency} onChange={handleChangeUrgency}>{"Giao khẩn cấp"}</Checkbox>
                                <Checkbox checked={in_day} onChange={handleChangeInDay}>{"Giao trong ngày"}</Checkbox>
                                <Checkbox checked={normal} onChange={handleChangeNormal} style={{ marginBottom: 12 }}>{"Giao bình thường"}</Checkbox>
                                <Text strong>{"Thời gian"}</Text>
                                <RangePicker
                                    defaultValue={[moment(new Date(), DATE_FORMAT), moment(new Date(), DATE_FORMAT)]}
                                    format={DATE_FORMAT}
                                    onChange={onChangeDate}
                                    value={[from_date, to_date]}
                                />
                            </div>
                            <div className={classnames('flex-row', 'justify-end')} style={{ marginTop: 12 }}>
                                <Button style={{ marginRight: 8 }}>{"Hủy"}</Button>
                                <Button type='primary' onClick={onSubmitFilter} >{"Áp dụng"}</Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={20}>
                    <Title level={4}>{`Thiết lập định tuyến tại ${warehouse.name}`}</Title>
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
                        <Col span={24}>
                            <Table
                                rowKey='order_id'
                                columns={columns}
                                dataSource={data_source}
                                loading={fetch_orders}
                                pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                                onRow={onRow}
                                rowSelection={rowSelection}
                                scroll={{ y: 290 }} />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div >
    )
}

export default memo(SetupWarehouse);