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

export const initial_state = {
    ...initial_state_warehouse,
    ...initial_state_priority,
    ...initial_state_setup
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
        default:
            return state;
    }
})