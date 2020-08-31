import React, { useMemo, useCallback } from 'react';
//antd
import { Typography } from 'antd';
//lib
import i18n from '../../../../libs/i18n';
import actions from './actions';

const { Text } = Typography;

const useTable = ({ selected_rows, dispatchState, handleSearchFleet }) => {
    const columns = useMemo(() => ([
        {
            title: 'Biển số',
            dataIndex: 'license_plates'
        },
        {
            title: 'Tên xe',
            dataIndex: 'name'
        },
        {
            title: 'Loại xe',
            dataIndex: 'type',
            render: text => (
                <Text>{i18n.t(text)}</Text>
            ),
            filters: [
                { text: i18n.t('normal'), value: 'normal' },
                { text: i18n.t('cold'), value: 'cold' },
            ],
            onFilter: (value, record) => record.type.includes(value),
        },
        {
            title: 'Trọng tải',
            dataIndex: 'weight',
            sorter: (a, b) => a.weight - b.weight,
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            sorter: (a, b) => a.size - b.size,
        },
        {
            title: 'Tuyến đường',
            dataIndex: 'route'
        },
    ]), []);

    const onSelectChange = useCallback((selected_row_keys, selected_rows) => {
        dispatchState({
            type: actions.SET_SELECTED_ROWS,
            selected_rows
        })
    }, [dispatchState])

    const rowSelection = useMemo(() => ({
        type: 'radio',
        selectedRows: selected_rows,
        onChange: onSelectChange,
    }), [selected_rows, onSelectChange])

    const handleTableChange = useCallback((pagination, filters, sorter) => {
        handleSearchFleet({ pagination, filters, sorter })
    }, [handleSearchFleet])

    return {
        columns,
        rowSelection,
        handleTableChange
    }
}

export default useTable;