import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import orderActions from '../../../order/reducer/actions';
//lib
import { PAGE, SIZE } from '../../../../config/table';
import cloneDeep from 'lodash/cloneDeep';

const useSearch = ({ warehouse, direction_templates, current_direction, is_compare, dispatchState }) => {
    const dispatch = useDispatch();
    const order_reducer = useSelector(state => state.order_reducer);
    const { orders, fetch_orders, pagination } = order_reducer;

    useEffect(() => {
        if (is_compare) {
            const orders_clone = cloneDeep(orders);
            let direction_orders = [];
            direction_templates.forEach(direction => {
                const { name, _id, truck } = direction;
                if (_id !== current_direction._id) {
                    direction.orders.forEach(order => {
                        direction_orders = [...direction_orders, {
                            direction_id: _id,
                            direction_name: name,
                            order_id: order.order_id,
                            truck
                        }]
                    })
                }
            });
            let current_orders = [];
            orders_clone.forEach(element => {
                //kiểm tra danh sách đơn hàng trong tuyến hiện tại
                const index_add = current_direction?.orders?.findIndex(item => item.order_id === element.order_id);
                if (index_add < 0) {
                    //kiểm tra danh sách đơn hàng trong các tuyến khác
                    const index_change = direction_orders.findIndex(item => item.order_id === element.order_id);
                    if (index_change > -1) {
                        //lấy id và tên của tuyến
                        element.direction_id = direction_orders[index_change].direction_id;
                        element.direction_name = direction_orders[index_change].direction_name;
                        //lấy thông tin xe
                        element.truck = direction_orders[index_change].truck;;
                    }
                    current_orders = [...current_orders, element]
                }
            });
            dispatchState({
                type: actions.SET_DATA_SOURCE,
                data_source: current_orders
            })
        }
    }, [orders, direction_templates, dispatchState, current_direction._id, current_direction.orders, is_compare])

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
        dispatchState({ type: actions.SET_IS_COMPARE, is_compare: true })
    }, [dispatch])

    return {
        fetch_orders,
        handleSearch
    }

}

export default useSearch;