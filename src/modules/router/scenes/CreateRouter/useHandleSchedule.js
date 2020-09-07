import { useCallback, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import fleetActions from '../../../fleet/reducer/actions';

const useHandleSchedule = ({ priority_truck, dispatchState }) => {
    const dispatch = useDispatch();
    const fleet_reducer = useSelector(state => state.fleet_reducer);
    const { trucks, find_trucks } = fleet_reducer;

    useEffect(() => {
        dispatchState({
            type: actions.SET_TRUCKS,
            trucks
        })
    }, [trucks, dispatchState])

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
    }
}

export default useHandleSchedule;