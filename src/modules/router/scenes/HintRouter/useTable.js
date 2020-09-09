import React, { useMemo, useCallback } from 'react';
//antd
import { Button, Typography, Dropdown, Menu, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
//lib
import i18n from '../../../../libs/i18n';
//utils
import { round } from '../../../../utils/number';

const { Text } = Typography;

const useTable = ({ current_direction, handleRemoveOrder }) => {
    const truck_columns = useMemo(() => ([
        {
            title: 'Loại xe',
            dataIndex: 'type',
            render: (text) => (
                <Text>{i18n.t(text)}</Text>
            )
        },
        {
            title: 'Tải trọng',
            dataIndex: 'weight',
            render: (text) => (
                <Text>{text + ' Tấn'}</Text>
            )
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            render: (text) => (
                <Text>{text + ' Khối'}</Text>
            )
        },
        {
            title: 'Tải trọng vượt quá',
            dataIndex: 'max_weight',
        },
    ]), []);

    const address_columns = useMemo(() => ([
        {
            title: 'STT',
            dataIndex: 'STT'
        },
        {
            title: 'Tên đường',
            dataIndex: 'address'
        },
        {
            title: '',
            dataIndex: 'operation',
            className: "antd-custom-action-table",
            width: 50,
            render: (text, item) => (
                <Button type='link' danger>{"Xóa"}</Button>
            ),
        }
    ]), []);

    const info_columns = useMemo(() => ([
        {
            title: 'Số đơn hàng',
            dataIndex: 'number_order',
        },
        {
            title: 'Tổng trọng lượng',
            dataIndex: 'weight',
            render: text => (
                <Text>{round(text)}</Text>
            )
        },
        {
            title: 'Tổng kích thước',
            dataIndex: 'size',
            render: text => (
                <Text>{round(text)}</Text>
            )
        }
    ]), []);

    const action_menu = useCallback((order) => {
        return (
            <Menu>
                <Menu.Item>
                    <span>{"Thông tin đơn hàng"}</span>
                </Menu.Item>
                <Menu.Item onClick={() => handleRemoveOrder({ order, current_direction })}>
                    <span>{"Gỡ khỏi tuyến"}</span>
                </Menu.Item>
            </Menu>
        );
    }, [current_direction, handleRemoveOrder]);

    const order_columns = useMemo(() => ([
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Chi nhánh',
            dataIndex: 'agency',
        },
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_id'
        },
        {
            title: 'Tổng số kiện hàng',
            dataIndex: 'quantity'
        },
        {
            title: 'Tổng trọng lượng',
            dataIndex: 'weight',
            render: (text) => (
                <Text>{text + ' Kg'}</Text>
            )
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            render: (text) => (
                <Text>{text + ' Khối'}</Text>
            )
        },
        {
            title: 'Cảnh báo',
            dataIndex: 'warning',
            render: text => {
                return (
                    <>
                        {
                            text ? <Tag color='warning'>{text}</Tag> : <span></span>
                        }
                    </>
                )
            }
        },
        {
            title: '',
            dataIndex: 'operation',
            className: "antd-custom-action-table",
            width: 50,
            render: (text, item) => (
                <div>
                    <Dropdown overlay={action_menu(item)} trigger={['click']}>
                        <EllipsisOutlined rotate={90} onClick={e => e.preventDefault()} />
                    </Dropdown>
                </div>
            ),
        },
    ]), [action_menu])


    return {
        truck_columns,
        address_columns,
        order_columns,
        info_columns
    }
}

export default useTable;