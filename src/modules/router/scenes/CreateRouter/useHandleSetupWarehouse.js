import { useCallback } from 'react';
import actions from './actions';

const useHandleSetupWarehouse = ({ dispatchState }) => {
    const onChangePriorityWarehouse = useCallback(event => {
        dispatchState({
            type: actions.SET_PRIORITY_WAREHOUSE,
            priority_warehouse: event.target.checked
        })
    }, [dispatchState])

    const onChangePriorityTruck = useCallback(event => {
        dispatchState({
            type: actions.SET_PRIORITY_TRUCK,
            priority_truck: event.target.value
        })
    }, [dispatchState])

    const onChangeSelectedOrder = useCallback((selected_row_keys, selected_rows) => {
        dispatchState({
            type: actions.SET_SELECTED_ORDER,
            selected_order_keys: selected_row_keys,
            selected_order: selected_rows
        })
    }, [dispatchState])

    return {
        onChangePriorityWarehouse,
        onChangePriorityTruck,
        onChangeSelectedOrder
    }
}

export default useHandleSetupWarehouse;