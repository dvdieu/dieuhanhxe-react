import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import routeActions from '../../reducer/actions';
//lib
import { useRouteMatch, useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

const useCommon = ({ dispatchState, direct, truck, event }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const id = match?.params?.id;

    const route_reducer = useSelector(state => state.route_reducer);
    const { direction_error, direction, get_direction_request } = route_reducer;
    const { status_code } = direction_error;

    useEffect(() => {
        if (status_code === 404) {
            window.location.replace('/not-found')
        }
    }, [status_code])

    useEffect(() => {
        if (!isEmpty(direction)) {
            const { truck, number_order, size, weight, warehouse, orders } = direction;
            const max_weight = weight - truck.weight;
            dispatchState({
                type: actions.SET_DIRECT,
                direct: direction
            })
            dispatchState({
                type: actions.SET_TRUCK_DATA,
                truck_data: [{
                    ...truck,
                    max_weight: max_weight > 0 ? max_weight : 0
                }]
            })
            dispatchState({
                type: actions.SET_INFO_DATA,
                info_data: [{ number_order, size, weight, id: 0 }]
            })
            dispatchState({
                type: actions.SET_ORIGIN,
                origin: {
                    latitude: warehouse.latitude,
                    longitude: warehouse.longitude
                }
            })
            //
            let waypoints = [], order_address = [];
            orders.forEach(order => {
                waypoints = [...waypoints, {
                    latitude: order.latitude,
                    longitude: order.longitude
                }]
                order_address = [...order_address, {
                    _id: order.order_id,
                    address: order.address
                }]
            });
            dispatchState({
                type: actions.SET_WAYPOINTS,
                waypoints
            })
            dispatchState({
                type: actions.SET_ORDER_ADDRESS,
                order_address
            })
            dispatchState({
                type: actions.SET_ORDERS,
                orders: orders
            })
            dispatchState({
                type: actions.SET_TRUCK,
                truck
            })
            dispatchState({
                type: actions.SET_EVENT,
                event: {
                    id: direction._id,
                    title: direction.name,
                    start: new Date(direction.start_date),
                    end: new Date(direction.end_date),
                    move: true,
                }
            })
        }
    }, [dispatchState, direction])

    const goBack = useCallback(() => {
        dispatchState({
            type: actions.SET_STEP,
            step: 0
        })
    }, [dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.SET_FETCH,
            fetch: get_direction_request
        })
    }, [dispatchState, get_direction_request])

    useEffect(() => {
        dispatch(routeActions.getDirectionRequest({ id }))
    }, [dispatch])

    const handleChangeSchedule = useCallback(({ current_event, current_truck }) => {
        dispatchState({
            type: actions.SET_TRUCK,
            truck: current_truck
        })
        dispatchState({
            type: actions.SET_EVENT,
            event: current_event
        })
        dispatchState({
            type: actions.SET_IS_EDIT,
            is_edit: true
        })
        goBack();
    }, [goBack])

    const handleSubmit = useCallback(() => {
        let params = {
            id: id,
            body: {
                ...direct,
                truck,
                start_date: (new Date(event.start).getTime()),
                end_date: (new Date(event.end).getTime()),
                warehouse: direct.warehouse.warehouse_id
            }
        }
        dispatch(routeActions.updateDirectionRequest(params));
        //note để tạm
        setTimeout(() => {
            history.push('/routes')
        }, 2000)
    }, [event, truck])

    return {
        goBack,
        handleChangeSchedule,
        handleSubmit,
    }
}

export default useCommon;