import actions from './actions';
import moment from 'moment';

const initial_state_event = {
    events: [],
    from_date: moment().day(1),
    to_date: moment().day(8),
    fetch_events: false
}

const initial_state_truck = {
    trucks: [],
    current_truck: {},
    current_event: {},
}

export const initial_state = {
    ...initial_state_event,
    ...initial_state_truck
}

export const reducer_state = ((state, action) => {
    switch (action.type) {
        case actions.SET_EVENTS:
            return {
                ...state,
                events: action.events
            }
        case actions.SET_FROM_DATE:
            return {
                ...state,
                from_date: action.from_date
            }
        case actions.SET_TO_DATE:
            return {
                ...state,
                to_date: action.to_date
            }
        case actions.FETCH_EVENTS:
            return {
                ...state,
                fetch_events: action.fetch_events
            }
        case actions.SET_TRUCKS:
            return {
                ...state,
                trucks: action.trucks
            }
        case actions.SET_CURRENT_TRUCK:
            return {
                ...state,
                current_truck: action.current_truck
            }
        case actions.SET_CURRENT_EVENT:
            return {
                ...state,
                current_event: action.current_event
            }
        default:
            return state;
    }
})