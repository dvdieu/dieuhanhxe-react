import actions from './actions';

const usePriotity = ({ dispatchState }) => {
    const onChangePriorityWarehouse = event => {
        dispatchState({
            type: actions.SET_PRIORITY_WAREHOUSE,
            priority_warehouse: event.target.checked
        })
    }

    const onChangePriorityTruck = event => {
        dispatchState({
            type: actions.SET_PRIORITY_TRUCK,
            priority_truck: event.target.value
        })
    }

    return {
        onChangePriorityWarehouse,
        onChangePriorityTruck,
    }
}

export default usePriotity;