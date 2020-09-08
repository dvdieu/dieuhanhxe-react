import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import orderActions from '../../../order/reducer/actions';
//config
import { PAGE, SIZE } from '../../../../config/table';
//lib
import moment from 'moment';

const useSearch = ({
    warehouse,
    dispatchState }) => {
    const dispatch = useDispatch();
    const order_reducer = useSelector(state => state.order_reducer);
    const { orders, fetch_orders, pagination } = order_reducer;

    useEffect(() => {
        dispatchState({
            type: actions.SET_DATA_SOURCE,
            data_source: orders
        })
    }, [orders, dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.SET_PAGINATION,
            pagination: pagination
        })
    }, [pagination, dispatchState])

    /*eslint-disable react-hooks/exhaustive-deps */
    const handleSearch = useCallback(({ keyword, from_date, to_date, urgency, in_day, normal }) => {
        let priority = [];
        if (urgency) priority.push('URGENCY');
        if (in_day) priority.push('IN_DAY');
        if (normal) priority.push('NORMAL');
        let status = [];
        if (priority.length > 0) {
            status = ['UNSET']
        }
        dispatch(orderActions.findOrdersRequest({
            page: PAGE,
            size: SIZE,
            warehouse_id: warehouse.warehouse_id,
            keyword,
            from_date: (new Date(from_date)).getTime(),
            to_date: (new Date(to_date)).getTime(),
            priority,
            status,
        }))
    }, [dispatch])

    useEffect(() => {
        handleSearch({
            keyword: '',
            from_date: moment().day(1),
            to_date: moment().day(8),
            urgency: true, in_day: true, normal: true
        });
    }, [handleSearch])

    return {
        fetch_orders,
        handleSearch
    }
}

export default useSearch;