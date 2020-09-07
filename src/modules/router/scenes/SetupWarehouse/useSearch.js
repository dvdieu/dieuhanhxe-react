import { useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import orderActions from '../../../order/reducer/actions';
//config
import { PAGE, SIZE } from '../../../../config/table';

const useSearch = ({ warehouse, dispatchState }) => {
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

    useEffect(() => {
        dispatch(orderActions.findOrdersRequest({
            page: PAGE,
            size: SIZE,
            warehouse_id: warehouse.warehouse_id
        }))
    }, [dispatch, warehouse])

    return {
        fetch_orders
    }
}

export default useSearch;