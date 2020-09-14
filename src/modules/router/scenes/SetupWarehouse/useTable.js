import React, { useCallback, useMemo } from 'react';
//antd
import { Dropdown, Menu, Typography, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
//lib
import isEmpty from 'lodash/isEmpty';
import i18n from '../../../../libs/i18n';

const { Text } = Typography;

const useTable = ({ selected_order_keys, onChangeSelectedOrder }) => {
    const action_menu = useCallback((item) => {
        return (
            <Menu>
                <Menu.Item>
                    <span>Thông tin đơn hàng</span>
                </Menu.Item>
            </Menu>
        );
    }, []);

    const columns = useMemo(() => (
        [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'order_id',
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
            },
            {
                title: 'Chi nhánh',
                dataIndex: 'agency',
            },
            {
                title: 'Độ ưu tiên',
                dataIndex: 'priority',
                render: text => (
                    <Text>{i18n.t(`PRIORITY_${text}`)}</Text>
                )
            },
            {
                title: 'Loại đơn hàng',
                dataIndex: 'type',
                render: text => (
                    <Text>{i18n.t(`${text}_TYPE`)}</Text>
                )
            },
            {
                title: 'Trọng lượng',
                dataIndex: 'weight',
            },
            {
                title: 'Kích thước',
                dataIndex: 'size',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: text => (
                    <Tag color='blue'>{i18n.t(`STATUS_${text}`)}</Tag>
                )
            },
            {
                title: '',
                dataIndex: 'operation',
                key: 'operation',
                fixed: 'right',
                className: "antd-custom-action-table",
                width: 50,
                render: (text, item) => (
                    <div
                        action-row-key={item.order_id}
                        style={{ visibility: 'hidden' }}
                    >
                        <Dropdown overlay={action_menu(item)} trigger={['click']}>
                            <EllipsisOutlined rotate={90} onClick={e => e.preventDefault()} />
                        </Dropdown>
                    </div>
                ),
            },
        ]
    ), [action_menu]);

    const onMouseEnter = useCallback((record) => {
        const row_item = document.querySelectorAll(`div[action-row-key='${record.order_id}']`);
        if (!isEmpty(row_item)) {
            row_item[0].style.visibility = 'visible';
        }
    }, [])

    const onMouseLeave = useCallback((record) => {
        const row_item = document.querySelectorAll(`div[action-row-key='${record.order_id}']`);
        if (!isEmpty(row_item)) {
            row_item[0].style.visibility = 'hidden';
        }
    }, []);

    const onRow = useCallback((record) => ({
        onMouseEnter: () => { onMouseEnter(record) },
        onMouseLeave: () => { onMouseLeave(record) },
    }), [onMouseEnter, onMouseLeave]);

    const onSelectChange = useCallback((selected_order_keys, selected_order) => {
        onChangeSelectedOrder(selected_order_keys, selected_order)
    }, [onChangeSelectedOrder])

    const rowSelection = useMemo(() => ({
        selectedRowKeys: selected_order_keys,
        onChange: onSelectChange,
    }), [selected_order_keys, onSelectChange])

    return {
        columns,
        onRow,
        rowSelection
    }
}

export default useTable;