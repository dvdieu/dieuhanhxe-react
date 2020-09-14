import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import fleetActions from '../../../fleet/reducer/actions';
import routeActions from '../../reducer/actions';
//lib
import isEmpty from 'lodash/isEmpty';

const useCommon = ({
    truck,
    current_truck,
    from_date,
    to_date,
    event,
    current_event,
    dispatchState,
    //
}) => {
    const dispatch = useDispatch();
    const fleet_reducer = useSelector(state => state.fleet_reducer);
    const { trucks } = fleet_reducer;
    const route_reducer = useSelector(state => state.route_reducer);
    const { truck_directions } = route_reducer;

    useEffect(() => {
        dispatch(fleetActions.findTrucksRequest({}))
    }, [dispatch])

    useEffect(() => {
        dispatchState({
            type: actions.SET_TRUCKS,
            trucks
        })
    }, [trucks, dispatchState])


    useEffect(() => {
        dispatchState({
            type: actions.SET_CURRENT_TRUCK,
            current_truck: truck
        })
    }, [truck, dispatchState]);

    useEffect(() => {
        dispatchState({
            type: actions.SET_CURRENT_EVENT,
            current_event: {
                ...event,
                move: true
            }
        })
    }, [event, dispatchState]);

    useEffect(() => {
        if (!isEmpty(current_truck.license_plates)) {
            dispatch(routeActions.getTruckDirectionsRequest({
                license_plates: current_truck.license_plates,
                from_date: (new Date(from_date)).setHours(0, 0, 0, 0),
                to_date: (new Date(to_date)).setHours(23, 59, 59, 999),
            }))
        }
    }, [from_date, to_date, current_truck])

    useEffect(() => {
        let events = [current_event];
        truck_directions.forEach(element => {
            if (element._id !== event.id) {
                events = [...events, {
                    id: element._id,
                    title: element.name,
                    start: new Date(element.start_date),
                    end: new Date(element.end_date),
                    move: false,
                }]
            }
        });
        dispatchState({
            type: actions.SET_EVENTS,
            events
        })
    }, [truck_directions, current_event, dispatchState]);

    const handleChangeTruck = useCallback((item) => {
        dispatchState({
            type: actions.SET_CURRENT_TRUCK,
            current_truck: item
        })
    }, [])

    return {
        handleChangeTruck
    }
}

export default useCommon;