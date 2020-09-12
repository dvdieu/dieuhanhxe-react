import { useCallback, useEffect } from "react";
//actions
import actions from "./actions";
//lib
import isEmpty from 'lodash/isEmpty';
import { round } from '../../../../utils/number';

const useCommon = ({ current_direction, dispatchState }) => {
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

    useEffect(() => {
        dispatchState({
            type: actions.SET_INFO_DATA,
            info_data: [{
                id: 0,
                number_order: current_direction?.orders?.length,
                weight: current_direction?.weight,
                size: current_direction?.size
            }]
        })
        if (!isEmpty(current_direction.truck)) {
            const max_weight = current_direction.weight - current_direction.truck.weight;
            console.log("useCommon -> max_weight", max_weight)
            dispatchState({
                type: actions.SET_TRUCK_DATA,
                truck_data: [{
                    ...current_direction.truck,
                    max_weight: max_weight > 0 ? round(max_weight) : 0
                }]
            })
        } else {
            dispatchState({
                type: actions.SET_TRUCK_DATA,
                truck_data: []
            })
        }
    }, [current_direction, dispatchState])

    return {
        handleCloseTruckDrawer,
        handleOpenTruckDrawer,
        handleCloseOrderDrawer,
        handleOpenOrderDrawer,
    }
}

export default useCommon;