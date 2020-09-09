import React, { useMemo, useCallback } from 'react';
//antd
import { Typography, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
//actions
import actions from './actions';

const { Text, Paragraph } = Typography;

const useTable = ({ selected_rows, dispatchState }) => {
    const action_menu = useCallback((item) => {
        return (
            <Menu>
                <Menu.Item>
                    <span>Xem thông tin đơn hàng</span>
                </Menu.Item>
            </Menu>
        );
    }, []);

    const columns = useMemo(() => ([
        {
            title: "Mã đơn hàng",
            dataIndex: "order_id"
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            render: text => (
                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                    {text}
                </Paragraph>
            )
        },
        {
            title: "Tổng số kiện hàng",
            dataIndex: "quantity",
            render: text => (
                <div>
                    <Text>{text}</Text>
                </div>
            )
        },
        {
            title: "Tổng trọng lượng",
            dataIndex: "weight",
            render: text => (
                <Text>{`${text} Kg`}</Text>
            ),
            // sorter: (a, b) => a.size - b.size,
        },
        {
            title: "Kích thước",
            dataIndex: "size",
            render: text => (
                <Text>{`${text} Khối`}</Text>
            ),
            // sorter: (a, b) => a.size - b.size,
        },
        {
            title: "Xe vận chuyển",
            render: (text, record) => (
                <div>
                    <Text>{record?.truck?.license_plates ? record?.truck?.license_plates : 'Chưa có'}</Text>
                </div>
            )
        },
        {
            title: "Tuyến đường",
            render: (text, record) => (
                <div>
                    <Text>{record?.direction_name ? record?.direction_name : 'Chưa có'}</Text>
                </div>
            )
        },
        {
            title: "",
            dataIndex: "operator",
            render: (text, item) => (
                <div
                    action-row-key={item.order_id}
                    style={{ visibility: 'hidden' }}
                >
                    <Dropdown overlay={action_menu(item)} trigger={['click']}>
                        <EllipsisOutlined rotate={90} onClick={e => e.preventDefault()} />
                    </Dropdown>
                </div>
            )
        },
    ]), [action_menu]);

    const onMouseEnter = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item.order_id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'visible'
        }
    }, [])

    const onMouseLeave = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item.order_id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'hidden'
        }
    }, [])

    const onRow = useCallback((item) => ({
        onMouseEnter: () => { onMouseEnter(item) },
        onMouseLeave: () => { onMouseLeave(item) },
    }), [onMouseEnter, onMouseLeave]);

    const onSelectChange = useCallback((selected_row_keys, selected_rows) => {
        dispatchState({
            type: actions.SET_SELECTED_ROWS,
            selected_row_keys,
            selected_rows,
        })
    }, [dispatchState])

    const rowSelection = useMemo(() => ({
        selectedRows: selected_rows,
        onChange: onSelectChange,
    }), [selected_rows, onSelectChange])

    return {
        columns,
        onRow,
        rowSelection
    }
}

export default useTable;