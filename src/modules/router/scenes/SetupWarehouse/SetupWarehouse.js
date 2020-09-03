import React, { memo, useReducer } from 'react';
//atnd
import { Typography, Checkbox, Radio, Button, Table, Input, Row, Col, DatePicker } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';
import moment from 'moment';
import { useHistory, useRouteMatch } from 'react-router-dom';
//config
import { DATE_FORMAT } from '../../../../config/format';
//variables
import { TRUCK_SIZE } from '../../../../variables/truck';
//hook
import warehouseState from './warehouseState';
import useTable from './useTable';
import useSearch from './useSearch';
import usePriotity from './usePriotity';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const SetupWarehouse = () => {
    //hook
    const history = useHistory();
    const match = useRouteMatch();
    const { initial_state, reducer_state } = warehouseState();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const {
        //table
        data_source,
        pagination,
        selected_row_keys,
        //priority
        priority_warehouse,
        priority_truck
    } = state;
    const { total_items, page_number, page_size } = pagination;

    const { columns, onRow, rowSelection } = useTable({ dispatchState, selected_row_keys });
    const { onChangePriorityWarehouse, onChangePriorityTruck, } = usePriotity({ dispatchState })
    useSearch();

    const onChangeDate = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

    const goToHintRouter = () => {
        const id = match?.params?.id;
        if (id) {
            history.push(`/warehouse/hint/${id}`);
        }
    }

    return (
        <div>
            <Title level={4}>{"Thiết lập định tuyến tại Kho 1"}</Title>
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
                    <div className={classnames('flex-row', 'justify-end')}>
                        <Button
                            type='primary'
                            icon={<PlusCircleOutlined />}
                            onClick={goToHintRouter}>{"Tạo định tuyến"}</Button>
                    </div>
                </div>
            </div>
            <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Text strong style={{ marginBottom: 12 }}>{"Danh sách đơn hàng"}</Text>
                </Col>
                <Col span={24} className={classnames('flex-row', 'justify-between')}>
                    <Search
                        placeholder="Tìm kiếm đơn hàng"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                    <RangePicker
                        defaultValue={[moment(new Date(), DATE_FORMAT), moment(new Date(), DATE_FORMAT)]}
                        format={DATE_FORMAT}
                        onChange={onChangeDate}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data_source}
                        pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                        onRow={onRow}
                        rowSelection={rowSelection} />
                </Col>
            </Row>
        </div >
    )
}

export default memo(SetupWarehouse);