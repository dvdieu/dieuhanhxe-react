import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import routeActions from '../../reducer/actions';
import actions from './actions';
//lib
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import Immutable from 'seamless-immutable';

const useHandleHintRouter = ({
    warehouse,
    priority_warehouse,
    priority_truck,
    selected_order,
    direction_templates,
    //
    dispatchState
}) => {
    const dispatch = useDispatch();

    const createDirectionTemplate = () => {
        const params = {
            warehouse,
            setup: {
                priority_warehouse,
                priority_truck,
            },
            orders: [...selected_order]
        }
        dispatch(routeActions.createDirectionTemplateRequest(params));
        dispatchState({
            type: actions.SET_STEP,
            step: 2
        })
    }

    const route_reducer = useSelector(state => state.route_reducer);
    const { create_direction_template_request } = route_reducer;

    useEffect(() => {
        dispatchState({
            type: actions.SET_DIRECTION_REQUEST,
            direction_request: create_direction_template_request
        })
    }, [create_direction_template_request, dispatchState])

    const handleChangeCurrentDirection = useCallback((current_direction) => {
        if (!isEmpty(current_direction)) {
            dispatchState({
                type: actions.SET_CURRENT_DIRECTION,
                current_direction
            })
            const { orders } = current_direction;
            dispatchState({
                type: actions.SET_ORDERS,
                orders
            })
            let waypoints = [], order_address = [];
            orders.forEach(element => {
                const { latitude, longitude, order_id, address } = element;
                waypoints = [...waypoints, {
                    latitude,
                    longitude
                }];
                order_address = [...order_address, {
                    _id: order_id,
                    address
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
            if (current_direction.confirm) {//da co xe
                const event = {
                    id: 'event_id',
                    title: current_direction.name,
                    allDay: false,
                    start: new Date(current_direction.start_date),
                    end: new Date(current_direction.end_date),
                    move: true,
                }
                dispatchState({
                    type: actions.SET_NEW_EVENT,
                    new_event: event
                })
            } else {
                dispatchState({
                    type: actions.SET_NEW_EVENT,
                    new_event: {}
                })
            }
        }
    }, [dispatchState])

    useEffect(() => {
        const directions = route_reducer.direction_templates;
        dispatchState({
            type: actions.SET_DIRECTION_TEMPLATES,
            direction_templates: directions
        })
        if (directions.length > 0) {
            const current_direction = directions[0];
            handleChangeCurrentDirection(current_direction);
        }
    }, [route_reducer.direction_templates, dispatchState, handleChangeCurrentDirection]);

    const handleRemoveOrder = useCallback(({ order, current_direction }) => {
        //cap nhat danh sach tuyen tam va don hang trong tuyen
        let directs = cloneDeep(direction_templates)
        let current_direct = cloneDeep(current_direction);
        let orders = Immutable.asMutable(current_direct.orders, { deep: true });
        const order_index = orders.findIndex(item => item.order_id === order.order_id);
        if (order_index > -1) {
            const order_splice = orders.splice(order_index, 1);
            current_direct.size -= order_splice[0].size;
            current_direct.weight -= order_splice[0].weight;
            current_direct.orders = orders;
            const direct_index = directs.findIndex(item => item._id === current_direct._id);
            if (direct_index > -1) {
                if (orders.length === 0) {//xóa tuyến
                    directs.splice(direct_index, 1);
                    if (directs.length === 0) {//đã xóa tất cả tuyến
                        //trở về màn hình trước đó
                        dispatchState({
                            type: actions.SET_STEP,
                            step: 1
                        })
                    } else {
                        //lấy tuyến hiện tại
                        handleChangeCurrentDirection(directs[0]);
                    }
                } else {//cap nhat tuyen
                    directs[direct_index] = current_direct;
                    handleChangeCurrentDirection(current_direct);
                }
                dispatchState({
                    type: actions.SET_DIRECTION_TEMPLATES,
                    direction_templates: directs
                })
            }
        }
    }, [dispatchState, direction_templates, handleChangeCurrentDirection])

    const handleAddOrder = useCallback(({ draft_orders, current_direction }) => {
        if (!isEmpty(current_direction) && !isEmpty(draft_orders)) {
            let directs = cloneDeep(direction_templates)
            let current_direct = cloneDeep(current_direction);
            let orders = Immutable.asMutable(current_direct.orders, { deep: true });
            let { size, weight } = current_direct;
            draft_orders.forEach(order => {
                //thêm đơn hàng vào tuyến hiện tại
                orders = [...orders, order];
                size += order.size;
                weight += order.weight;
                if (!isEmpty(order.direction_id)) {
                    //xóa đơn hàng khỏi tuyến khác
                    const index_direct = directs.findIndex(item => item._id === order.direction_id);
                    if (index_direct > -1) {
                        //lay sanh sach order của tuyến đó
                        let other_orders = directs[index_direct].orders;
                        const index_order = other_orders.findIndex(item => item.order_id === order.order_id);
                        if (index_order > -1) {
                            //nếu số đơn hàng = 1: xóa tuyến
                            if (other_orders.length === 1) {
                                directs.splice(index_direct, 1)
                            } else {
                                other_orders.splice(index_order, 1);
                                directs[index_direct].orders = other_orders;
                                directs[index_direct].size -= order.size;
                                directs[index_direct].weight -= order.weight;
                            }
                        }
                    }
                }
            });
            //cap nhat tuyen hien tai
            current_direct.orders = orders;
            current_direct.size = size;
            current_direct.weight = weight;
            handleChangeCurrentDirection(current_direct);
            //cap nhat danh sach tuyen
            const index_direct = directs.findIndex(item => item._id === current_direction._id);
            if (index_direct > -1) {
                directs[index_direct].orders = orders;
                directs[index_direct].size = size;
                directs[index_direct].weight = weight;
            }
            dispatchState({
                type: actions.SET_DIRECTION_TEMPLATES,
                direction_templates: directs
            })
        }
    }, [dispatchState, direction_templates, handleChangeCurrentDirection])

    return {
        createDirectionTemplate,
        handleChangeCurrentDirection,
        handleRemoveOrder,
        handleAddOrder,
    }
}

export default useHandleHintRouter;