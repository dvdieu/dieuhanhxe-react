import { useCallback, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import routeActions from '../../reducer/actions';
//lib
import isEmpty from 'lodash/isEmpty';

const useCommon = ({ from_date,
    to_date,
    truck,
    current_direction,
    direction_templates,
    new_event,
    //
    dispatchState,
    handleChangeTruck }) => {
    const dispatch = useDispatch();
    const route_reducer = useSelector(state => state.route_reducer);
    const { get_truck_direction_request, truck_directions } = route_reducer;

    useEffect(() => {
        let events = [];
        truck_directions.forEach(element => {
            events = [...events, {
                // id: element._id,
                id: element._id,
                title: element.name,
                start: new Date(element.start_date),
                end: new Date(element.end_date),
                move: false,
            }]
        });
        if (!isEmpty(new_event)) {
            events = [...events, new_event]
        }
        direction_templates.forEach(element => {
            if (element.truck?.license_plates === truck.license_plates) {
                if (element.start_date && element._id !== current_direction._id) {
                    events = [...events, {
                        id: element._id,
                        title: element.name,
                        start: new Date(element.start_date),
                        end: new Date(element.end_date),
                        move: false,
                    }]
                }
            }
        });
        dispatchState({
            type: actions.SET_EVENTS,
            events
        })
    }, [truck_directions, truck, current_direction, dispatchState, new_event])

    useEffect(() => {
        dispatchState({
            type: actions.FETCH_EVENTS,
            fetch_events: get_truck_direction_request
        })
    }, [get_truck_direction_request, dispatchState])

    const handleSelectTruck = useCallback((item) => {
        handleChangeTruck(item);
    }, [handleChangeTruck])

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