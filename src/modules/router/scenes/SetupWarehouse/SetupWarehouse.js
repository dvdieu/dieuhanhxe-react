import React, { memo, useState, useMemo } from 'react';
//layout
import BasicLayout from '../../../../layouts/BasicLayout';
//atnd
import { Typography, Checkbox, Radio, Button, Table, Input, Row, Col, DatePicker } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';
import moment from 'moment';
//config
import { DATE_FORMAT } from '../../../../config/format';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const truck_size = {
    LARGE: 'large',
    SMALL: 'small'
}

const data = [
    {
        id: 'HD001',
        address: '04 Thụy Khê',
        priority: '40',
        status: 'Khẩn cấp'
    },
    {
        id: 'HD002',
        address: 'Vinmart + 182 Lê Đại Hành',
        priority: '38',
        status: 'Giao trong ngày'
    },
    {
        id: 'HD003',
        address: '36 Hoàng Cầu',
        priority: 'Bình thường',
        status: 'Đã giao'
    },
    {
        id: 'HD004',
        address: '01 Cổ Nhuế',
        priority: 'Bình thường',
        status: 'Chưa sắp lịch'
    },
]

const SetupWarehouse = () => {
    const [priority_warehouse, setPriorityWarehouse] = useState(false);
    const [priority_truck, setPriorityTruck] = useState(truck_size.LARGE)

    const onChangePriorityWarehouse = event => {
        setPriorityWarehouse(event.target.checked);
    }

    const onChangePriorityTruck = event => {
        setPriorityTruck(event.target.value);
    }

    const onChangeDate = (dates, dateStrings) => {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }

    const columns = useMemo(() => (
        [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'id',
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
            },
            {
                title: 'Độ ưu tiên',
                dataIndex: 'priority',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <span>chi tiet</span>
                )
            },
        ]
    ), [])

    return (
        <div>
            <Title level={4}>{"Thiết lập định tuyến tại Kho 1"}</Title>
            <div className={styles.setup}>
                <Text strong>{"Thiết lập tham số định tuyến"}</Text>
                <div className={classnames(styles.setup_content, 'flex-column')}>
                    <Checkbox checked={priority_warehouse} onChange={onChangePriorityWarehouse}>{"Ưu tiên dùng xe tại kho"}</Checkbox>
                    <Radio.Group onChange={onChangePriorityTruck} value={priority_truck}>
                        <Radio className={styles.radio} value={truck_size.LARGE}>
                            {"Ưu tiên xe có trọng tải lớn trước"}
                        </Radio>
                        <Radio className={styles.radio} value={truck_size.SMALL}>
                            {"Ưu tiên xe có trọng tải nhỏ trước"}
                        </Radio>
                    </Radio.Group>
                    <div className={classnames('flex-row', 'justify-end')}>
                        <Button type='primary' icon={<PlusCircleOutlined />}>{"Tạo định tuyến"}</Button>
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
                    <Table columns={columns} dataSource={data} rowKey="id"/>
                </Col>
            </Row>
        </div >
    )
}

SetupWarehouse.Layout = BasicLayout;

export default memo(SetupWarehouse);