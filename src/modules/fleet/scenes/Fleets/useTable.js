import React, { useMemo, useCallback } from 'react';

import { Typography, Tag, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
//actions
import FleetActions from '../../reducer/actions';
//redux
import { useDispatch } from "react-redux";
//lib
import i18n from '../../../../libs/i18n';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

const useTable = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const goToFleetInfo = useCallback((id) => {
        if (id) {
            history.push(`/fleet/${id}`)
        }
    }, [history])

    const action_menu = useCallback((item) => {
        const { id } = item;
        return (
            <Menu>
                <Menu.Item onClick={() => { console.log('Đơn hàng đang giao:', item.id) }}>
                    <span>Đơn hàng đang giao</span>
                </Menu.Item>
                <Menu.Item onClick={() => { goToFleetInfo(id) }}>
                    <span>Thông tin xe</span>
                </Menu.Item>
                <Menu.Item onClick={() => { console.log('Chỉnh sửa:', item.id) }}>
                    <span>Chỉnh sửa</span>
                </Menu.Item>
                <Menu.Item onClick={() => { console.log('Xóa:', item.id) }}>
                    <span>Xóa</span>
                </Menu.Item>
            </Menu>
        );
    }, [goToFleetInfo]);

    const columns = useMemo(() =>
        (
            [
                {
                    title: 'Biển số',
                    dataIndex: 'license_plates',
                },
                {
                    title: 'Tên xe',
                    dataIndex: 'name',
                },
                {
                    title: 'Hãng xe',
                    dataIndex: 'maker',
                },
                {
                    title: 'Loại xe',
                    dataIndex: 'type',
                    render: (text) => (
                        <Text>{i18n.t(text)}</Text>
                    )
                },
                {
                    title: 'Trọng tải',
                    dataIndex: 'weight',
                },
                {
                    title: 'Kích thước',
                    dataIndex: 'size',
                },
                {
                    title: 'Kho',
                    dataIndex: 'warehouse'
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'status',
                    render: (text) => (
                        <Tag color={text === 'waiting' ? 'orange' : 'success'}>{i18n.t(text)}</Tag>
                    )
                },
                {
                    title: 'Action',
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
        ), [action_menu])


    const onMouseEnter = useCallback((record) => {
        const row_item = document.querySelectorAll(`div[action-row-key='${record.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'visible';
        }
    }, [])

    const onMouseLeave = useCallback((record) => {
        const row_item = document.querySelectorAll(`div[action-row-key='${record.id}']`);
        if (row_item) {
            row_item[0].style.visibility = 'hidden';
        }
    }, [])

    const onRow = useCallback((record) => ({
        onMouseEnter: () => { onMouseEnter(record) },
        onMouseLeave: () => { onMouseLeave(record) },
    }), [onMouseEnter, onMouseLeave])

    const handleTableChange = useCallback((pagination, filters, sorter) => {
        dispatch(FleetActions.getFleetsRequest({ page: pagination.current, size: pagination.pageSize }))
    }, [dispatch])

    return {
        columns,
        handleTableChange,
        onRow
    }
}

export default useTable;