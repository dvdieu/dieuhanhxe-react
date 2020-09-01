import { useCallback } from "react";
import actions from "./actions";

const useCommon = ({ dispatchState }) => {
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
            type: actions.SET_ORDERS,
            orders
        });
        handleCloseOrderDrawer();
    }, [dispatchState, handleCloseOrderDrawer])

    return {
        handleCloseTruckDrawer,
        handleOpenTruckDrawer,
        handleCloseOrderDrawer,
        handleOpenOrderDrawer,
        handleAddOrder
    }
}

export default useCommon;