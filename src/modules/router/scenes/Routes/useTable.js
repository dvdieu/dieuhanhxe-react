import React, { useMemo, useCallback } from 'react';
//antd
import { Menu, Dropdown, Typography, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
//lib
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

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
    }, [])


    const columns = useMemo(() => ([
        {
            title: 'Tuyến',
            dataIndex: '',
            render: (text, item) => (
                <div className={classnames('flex-column', 'align-top')}>
                    <Text>{item.name}</Text>
                    <Text>{item._id}</Text>
                </div>
            )
        },
        {
            title: 'Thời gian',
            dataIndex: '',
            render: (text, item) => (
                <div className={classnames('flex-column', 'align-top')}>

                </div>
            )
        },
        {
            title: 'Hàng hóa',
            dataIndex: '',
            render: (text, item) => (
                <div className={classnames('flex-column', 'align-top')}>
                    <div>
                        <Text>{"Số đơn"}</Text>
                        <Text style={{ marginLeft: 8 }}>{item.number_order}</Text>
                    </div>
                    <div>
                        <Text>{"Tổng trọng lượng"}</Text>
                        <Text style={{ marginLeft: 8 }}>{item.weight}</Text>
                    </div>
                    <div>
                        <Text>{"Tổng kích thước"}</Text>
                        <Text style={{ marginLeft: 8 }}>{item.size}</Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Xe',
            dataIndex: '',
            render: (text, item) => (
                <div className={classnames('flex-column', 'align-top')}>
                    <div className={classnames('flex-row', 'justify-start')}>
                        <Text>{item?.truck?.license_plates}</Text>
                    </div>
                    <div className={classnames('flex-row', 'justify-start')}>
                        <Text>{"Tải trọng"}</Text>
                        <Text style={{ marginLeft: 8 }}>{item?.truck?.weight}</Text>
                    </div>
                    <div className={classnames('flex-row', 'justify-start')}>
                        <Text>{"Kích thước"}</Text>
                        <Text style={{ marginLeft: 8 }}>{item?.truck?.size}</Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: '',
            render: (text, item) => (
                <div className={classnames('flex-column', 'align-top')}>
                    <Tag color='blue'>{"Đang chờ"}</Tag>
                </div>
            )
        },
        {
            title: '',
            dataIndex: 'operator',
            render: (text, item) => (
                <div
                    action-row-key={item._id}
                    style={{ visibility: 'hidden' }}
                >
                    <Dropdown overlay={action_menu(item)} trigger={['click']}>
                        <EllipsisOutlined rotate={90} onClick={e => e.preventDefault()} />
                    </Dropdown>
                </div>
            )
        }
    ]), [action_menu])

    const onMouseEnter = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item._id}']`);
        if (!isEmpty(row_item)) {
            row_item[0].style.visibility = 'visible';
        }
    }, [])

    const onMouseLeave = useCallback(item => {
        const row_item = document.querySelectorAll(`div[action-row-key='${item._id}']`);
        if (!isEmpty(row_item)) {
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