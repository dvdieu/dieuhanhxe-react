import actions from './actions';
import { TRUCK_SIZE } from '../../../../variables/truck';
//lib
import cloneDeep from 'lodash/cloneDeep';

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

const initial_state_hint = {
    direction_templates: [],
    direction_request: false,
    current_direction: {},
    waypoints: [],
    order_address: []
}

const initial_state_schedule = {
    trucks: [],
    find_trucks: false,
    direction_name: '',
    new_event: {},
    truck: {}
}

export const initial_state = {
    ...initial_state_warehouse,
    ...initial_state_priority,
    ...initial_state_setup,
    ...initial_state_schedule,
    ...initial_state_hint,
    step: 2
}

export const reducer_state = ((state, action) => {
    switch (action.type) {
        /* #region  setup */
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
        /* #endregion */
        /* #region  hint */
        case actions.SET_ORDERS:
            return {
                ...state,
                orders: [...action.orders]
            }
        case actions.ADD_ORDER: {
            let orders = cloneDeep(state.orders);
            orders = [...action.orders, ...orders];
            return {
                ...state,
                orders
            }
        }
        case actions.SET_ADDRESS:
            return {
                ...state,
                address: action.address
            }
        case actions.SET_DIRECTION_REQUEST:
            return {
                ...state,
                direction_request: action.direction_request
            }
        case actions.SET_DIRECTION_TEMPLATES:
            return {
                ...state,
                direction_templates: action.direction_templates
            }
        case actions.SET_CURRENT_DIRECTION:
            return {
                ...state,
                current_direction: action.current_direction
            }
        case actions.SET_WAYPOINTS:
            return {
                ...state,
                waypoints: action.waypoints
            }
        case actions.SET_ORDER_ADDRESS:
            return {
                ...state,
                order_address: action.order_address
            }
        /* #endregion */
        // 
        /* #region  schedule */
        case actions.SET_TRUCKS:
            return {
                ...state,
                trucks: action.trucks
            }
        case actions.SET_TRUCK:
            return {
                ...state,
                truck: action.truck
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
        /* #endregion */
        default:
            return state;
    }
})