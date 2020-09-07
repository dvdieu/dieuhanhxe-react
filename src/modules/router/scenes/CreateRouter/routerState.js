import actions from './actions';
import { TRUCK_SIZE } from '../../../../variables/truck';

const initial_state_priority = {
    priority_warehouse: false,
    priority_truck: TRUCK_SIZE.LARGE
}

const initial_state_warehouse = {
    warehouse: { warehouse_id: 0 }
}

const initial_state_setup = {
    selected_order: [],
    selected_order_keys: []
}

const initial_state_schedule = {
    trucks: [],
    find_trucks: false,
    direction_name: '',
    new_event: {},
}

export const initial_state = {
    ...initial_state_warehouse,
    ...initial_state_priority,
    ...initial_state_setup,
    ...initial_state_schedule,
    step: 0
}

export const reducer_state = ((state, action) => {
    switch (action.type) {
        case actions.SET_WAREHOUSE:
            return {
                ...state,
                warehouse: action.warehouse
            }
        case actions.SET_PRIORITY_WAREHOUSE:
            return {
                ...state,
                priority_warehouse: action.priority_warehouse
            }
        case actions.SET_PRIORITY_TRUCK:
            return {
                ...state,
                priority_truck: action.priority_truck
            }
        case actions.SET_SELECTED_ORDER:
            return {
                ...state,
                selected_order: action.selected_order,
                selected_order_keys: action.selected_order_keys
            }
        case actions.SET_STEP:
            return {
                ...state,
                step: action.step
            }
        // schedule
        case actions.SET_TRUCKS:
            return {
                ...state,
                trucks: action.trucks
            }
        case actions.SET_FIND_TRUCKS:
            return {
                ...state,
                find_trucks: action.find_trucks
            }
        case actions.SET_DIRECTION_NAME:
            return {
                ...state,
                direction_name: action.direction_name
            }
        case actions.SET_NEW_EVENT:
            return {
                ...state,
                new_event: action.new_event
            }
        default:
            return state;
    }
})