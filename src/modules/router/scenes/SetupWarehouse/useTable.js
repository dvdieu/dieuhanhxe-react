import React, { useCallback, useMemo } from 'react';
import { Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import actions from './actions';

const useTable = ({ dispatchState, selected_row_keys }) => {

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
                dataIndex: 'operation',
                key: 'operation',
                fixed: 'right',
                className: "antd-custom-action-table",
                width: 50,
                render: (text, item) => (
                    <div
                        action-row-key={item.id}
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
        const row_item = document.querySelectorAll(`div[action-row-key='${record.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'visible';
        }
    }, [])

    const onMouseLeave = useCallback((record) => {
        const row_item = document.querySelectorAll(`div[action-row-key='${record.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'hidden'
        }
    }, []);

    const onRow = useCallback((record) => ({
        onMouseEnter: () => { onMouseEnter(record) },
        onMouseLeave: () => { onMouseLeave(record) },
    }), [onMouseEnter, onMouseLeave]);

    const onSelectChange = useCallback((selected_row_keys) => {
        dispatchState({
            type: actions.SET_SELECTED_ROW_KEYS,
            selected_row_keys
        })
    }, [dispatchState])

    const rowSelection = useMemo(() => ({
        selectedRowKeys: selected_row_keys,
        onChange: onSelectChange,
    }), [selected_row_keys, onSelectChange])

    return {
        columns,
        onRow,
        rowSelection
    }
}

export default useTable;