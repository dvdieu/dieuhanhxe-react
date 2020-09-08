import { useCallback, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import routeActions from '../../reducer/actions';

const useCommon = ({ from_date, to_date, truck, dispatchState, handleChangeTruck, handleChangeNewEvent }) => {
    const dispatch = useDispatch();
    const route_reducer = useSelector(state => state.route_reducer);
    const { get_truck_direction_request, truck_directions } = route_reducer;

    useEffect(() => {
        let events = [];
        truck_directions.forEach(element => {
            events = [...events, {
                id: element._id,
                title: element.name,
                start: new Date(element.start_date),
                end: new Date(element.end_date),
                move: false,
            }]
        });
        dispatchState({
            type: actions.SET_EVENTS,
            events
        })
    }, [truck_directions, dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.FETCH_EVENTS,
            fetch_events: get_truck_direction_request
        })
    }, [get_truck_direction_request, dispatchState])

    const handleSelectTruck = useCallback((item) => {
        handleChangeTruck(item);
        handleChangeNewEvent({});
    }, [handleChangeNewEvent, handleChangeTruck])

    useEffect(() => {
        dispatch(routeActions.getTruckDirectionsRequest({
            license_plates: truck.license_plates,
            from_date: (new Date(from_date)).setHours(0, 0, 0, 0),
            to_date: (new Date(to_date)).setHours(23, 59, 59, 999),
        }))
    }, [from_date, to_date, truck, dispatch])

    return {
        handleSelectTruck
    }
}

export default useCommon;