import { useMemo, useCallback } from 'react';

//actions
import FleetActions from '../../reducer/actions';
//redux
import { useDispatch } from "react-redux";

const useTable = () => {
    const dispatch = useDispatch();

    const columns = useMemo(() =>
        (
            [
                {
                    title: 'id',
                    dataIndex: 'id',
                },
                {
                    title: 'Tên đội',
                    dataIndex: 'name',
                },
                {
                    title: 'Loại xe',
                    dataIndex: 'type',
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
                    dataIndex: 'ware_house'
                },
                // {
                //     title: 'Action',
                //     dataIndex: 'operation',
                //     key: 'operation',
                //     fixed: 'right',
                //     width: 100,
                //     render: () => (
                //         <a href='/'>Chi tiết</a>
                //     ),
                // },
            ]
        ), [])

    const handleTableChange = useCallback((pagination, filters, sorter) => {
        dispatch(FleetActions.getFleetsRequest({ page: pagination.current, size: pagination.pageSize }))
    }, [dispatch])

    return {
        columns,
        handleTableChange
    }
}

export default useTable;