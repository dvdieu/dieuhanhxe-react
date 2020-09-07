import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import routeActions from '../../reducer/actions';
import actions from './actions';
//lib
import isEmpty from 'lodash/isEmpty';

const useHandleHintRouter = ({
    warehouse,
    priority_warehouse,
    priority_truck,
    selected_order,
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
    const { direction_templates, create_direction_template_request } = route_reducer;

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
        }
    }, [dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.SET_DIRECTION_TEMPLATES,
            direction_templates
        })
        const current_direction = direction_templates[0];
        handleChangeCurrentDirection(current_direction);
    }, [direction_templates, dispatchState, handleChangeCurrentDirection])


    return {
        createDirectionTemplate,
        handleChangeCurrentDirection
    }
}

export default useHandleHintRouter;