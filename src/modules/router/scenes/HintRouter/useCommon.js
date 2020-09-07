import { useCallback, useEffect } from "react";
//redux
import { useSelector } from 'react-redux';
//actions
import actions from "./actions";
//lib
import isEmpty from 'lodash/isEmpty';

const useCommon = ({ dispatchState }) => {
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


    const handleCloseTruckDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_TRUCK_VISIBLE,
            truck_visible: false
        })
    }, [dispatchState])

    const handleOpenTruckDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_TRUCK_VISIBLE,
            truck_visible: true
        })
    }, [dispatchState])

    const handleCloseOrderDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_ORDER_VISIBLE,
            order_visible: false
        })
    }, [dispatchState])

    const handleOpenOrderDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_ORDER_VISIBLE,
            order_visible: true
        })
    }, [dispatchState])

    const handleAddOrder = useCallback((orders) => {
        dispatchState({
            type: actions.ADD_ORDERS,
            orders
        });
        handleCloseOrderDrawer();
    }, [dispatchState, handleCloseOrderDrawer])

    const handleAddDodgeAddress = useCallback(address => {
        dispatchState({
            type: actions.ADD_DODGE_ADDRESS,
            address
        })
        dispatchState({
            type: actions.SET_ADDRESS,
            address: ''
        })
    }, [dispatchState])

    const handleChangeAddress = useCallback(address => {
        dispatchState({
            type: actions.SET_ADDRESS,
            address
        })
    }, [dispatchState])

    return {
        handleCloseTruckDrawer,
        handleOpenTruckDrawer,
        handleCloseOrderDrawer,
        handleOpenOrderDrawer,
        handleAddOrder,
        handleAddDodgeAddress,
        handleChangeAddress,
        handleChangeCurrentDirection
    }
}

export default useCommon;