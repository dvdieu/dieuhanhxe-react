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

    return {
        handleCloseTruckDrawer,
        handleOpenTruckDrawer
    }
}

export default useCommon;