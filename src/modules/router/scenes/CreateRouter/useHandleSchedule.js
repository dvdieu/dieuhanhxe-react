import { useCallback, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import fleetActions from '../../../fleet/reducer/actions';
//lib
import isEmpty from 'lodash/isEmpty';

const useHandleSchedule = ({
    priority_truck,
    current_direction,
    dispatchState }) => {
    const dispatch = useDispatch();
    const fleet_reducer = useSelector(state => state.fleet_reducer);
    const { trucks, find_trucks } = fleet_reducer;

    const handleChangeTruck = useCallback(truck => {
        dispatchState({
            type: actions.SET_TRUCK,
            truck
        })
    }, [dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.SET_TRUCKS,
            trucks
        })
        if (!isEmpty(current_direction.truck)) {
            handleChangeTruck(current_direction.truck)
        } else if (trucks.length > 0) {
            handleChangeTruck(trucks[0])
        }
    }, [trucks, current_direction, dispatchState, handleChangeTruck])

    useEffect(() => {
        dispatchState({
            type: actions.SET_FIND_TRUCKS,
            find_trucks
        })
    }, [find_trucks, dispatchState])

    const selectTruck = useCallback(({ weight, size, direction_name }) => {
        dispatchState({
            type: actions.SET_STEP,
            step: 3
        })
        dispatchState({
            type: actions.SET_DIRECTION_NAME,
            direction_name
        })
        dispatch(fleetActions.findTrucksRequest({
            weight, size, priority_truck
        }))
    }, [dispatchState, dispatch, priority_truck])

    const handleChangeNewEvent = useCallback((new_event) => {
        dispatchState({
            type: actions.SET_NEW_EVENT,
            new_event
        })
    }, [dispatchState])

    return {
        selectTruck,
        handleChangeNewEvent,
        handleChangeTruck,
    }
}

export default useHandleSchedule;