import actions from './actions';

const init_state_table = {
    truck_data: [],
    info_data: [],
    orders: [],
}

const init_state_google = {
    origin: { latitude: 0, longitude: 0 },
    waypoints: [],
    order_address: [],
}

const init_state_direct = {
    truck: {},
    current_event: {},
    direct: {},
}

export const init_state = {
    ...init_state_table,
    ...init_state_google,
    ...init_state_direct,
    fetch: true,
    is_edit: false,
    step: 0
}

export const reducer_state = ((state, action) => {
    switch (action.type) {
        case actions.SET_TRUCK_DATA:
            return {
                ...state,
                truck_data: action.truck_data
            }
        case actions.SET_INFO_DATA:
            return {
                ...state,
                info_data: action.info_data
            }
        case actions.SET_FETCH:
            return {
                ...state,
                fetch: action.fetch
            }
        case actions.SET_ORIGIN:
            return {
                ...state,
                origin: action.origin
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
        case actions.SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case actions.SET_IS_EDIT:
            return {
                ...state,
                is_edit: action.is_edit
            }
        case actions.SET_STEP:
            return {
                ...state,
                step: action.step
            }
        case actions.SET_TRUCK:
            return {
                ...state,
                truck: action.truck
            }
        case actions.SET_EVENT:
            return {
                ...state,
                event: action.event
            }
        case actions.SET_DIRECT:
            return {
                ...state,
                direct: action.direct
            }
        default:
            return state;
    }
})