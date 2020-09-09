import React, { useReducer, useCallback } from 'react';
//atnd
import { Drawer, Button, Row, Col, Input, Table, Checkbox, DatePicker, Typography } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
//lib
import classnames from 'classnames';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
//hook
import useTable from './useTable';
import orderState from './orderState';
import useSearch from './useSearch';
import styles from './styles.module.scss';

const { Text } = Typography;
const { RangePicker } = DatePicker;

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
            width={1100}
            onClose={onClose}
            // visible={visible}
            visible={true}
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
                    <Col span={5}>
                        <div className={classnames(styles['filter-container'], 'flex-column')}>
                            <Input style={{ width: '100%' }} addonAfter={<SearchOutlined />} placeholder="Tìm kiếm đơn hàng"
                            //  onChange={handleChangeKeyword} value={keyword} 
                            />
                            <div className={classnames(styles['filter-content'], 'flex-column', 'justify-between')}>
                                <div className='flex-column'>
                                    <div>
                                        <FilterOutlined style={{ marginRight: 8 }} />
                                        <Text strong>{"Bộ lọc"}</Text>
                                    </div>
                                    <Text strong>{"Độ ưu tiên"}</Text>
                                    <Checkbox
                                    // checked={urgency} onChange={handleChangeUrgency}
                                    >{"Giao khẩn cấp"}</Checkbox>
                                    <Checkbox
                                    // checked={in_day} onChange={handleChangeInDay}
                                    >{"Giao trong ngày"}</Checkbox>
                                    <Checkbox
                                        // checked={normal} onChange={handleChangeNormal} 
                                        style={{ marginBottom: 12 }}>{"Giao bình thường"}</Checkbox>
                                    <Text strong>{"Thời gian"}</Text>
                                    <RangePicker
                                    // defaultValue={[moment(new Date(), DATE_FORMAT), moment(new Date(), DATE_FORMAT)]}
                                    // format={DATE_FORMAT}
                                    // onChange={onChangeDate}
                                    // value={[from_date, to_date]}
                                    />

                                </div>
                                <div className={classnames('flex-row', 'justify-end')} style={{ marginTop: 12 }}>
                                    <Button style={{ marginRight: 8 }}>{"Hủy"}</Button>
                                    <Button type='primary'
                                    //  onClick={onSubmitFilter} 
                                    >{"Áp dụng"}</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={19}>
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