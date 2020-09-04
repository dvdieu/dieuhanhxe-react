import React, { useMemo, useCallback } from 'react';
//antd
import { Menu, Dropdown, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Text } = Typography;

const useTable = () => {
    const action_menu = useCallback(item => {
        return (
            <Menu>
                <Menu.Item onClick={() => { console.log(' : ', item.id) }}>
                    <Text>Xem thông tin</Text>
                </Menu.Item>
                <Menu.Item>
                    <Text>Cập nhật</Text>
                </Menu.Item>
                <Menu.Item onClick={() => { console.log('Chỉnh sửa:', item.id) }}>
                    <Text>Xóa</Text>
                </Menu.Item>
            </Menu>
        )
    },[])


    const columns = useMemo(() => ([
        {
            title: '',
            dataIndex: ''
        },
        {
            title: '',
            dataIndex: 'operator',
            render: (text, item) => (
                <div
                    action-row-key={item.id}
                    style={{ visibility: 'hidden' }}
                >
                    <Dropdown overlay={action_menu(item)} trigger={['click']}>
                        <EllipsisOutlined rotate={90} onClick={e => e.preventDefault()} />
                    </Dropdown>
                </div>
            )
        }
    ]),[action_menu])

    const onMouseEnter = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'visible';
        }
    }, [])

    const onMouseLeave = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'hidden';
        }
    }, [])

    const onRow = useCallback((item) => ({
        onMouseEnter: () => { onMouseEnter(item) },
        onMouseLeave: () => { onMouseLeave(item) },
    }), [onMouseEnter, onMouseLeave])

    return {
        columns,
        onRow
    }
}

export default useTable;