import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import orderActions from '../../../order/reducer/actions';
//config
import { PAGE, SIZE } from '../../../../config/table';


const useSearch = ({
    warehouse,
    keyword,
    from_date,
    to_date,
    urgency,
    in_day,
    normal,
    unset,
    ready,
    finish,
    progress,
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

    const handleSearch = useCallback(() => {
        let priority = [];
        if (urgency) priority.push('URGENCY');
        if (in_day) priority.push('IN_DAY');
        if (normal) priority.push('NORMAL');
        let status = [];
        if (unset) status.push('UNSET');
        if (ready) status.push('READY');
        if (finish) status.push('FINISH');
        if (progress) status.push('PROGRESS');
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
    }, [dispatch, warehouse, urgency, in_day, normal, unset, ready, finish, progress, from_date, to_date, keyword])

    useEffect(() => {
        handleSearch();
    }, [handleSearch])

    return {
        fetch_orders,
        handleSearch
    }
}

export default useSearch;