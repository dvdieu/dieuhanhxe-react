import actions from './actions';

const init_truck_state = {
    truck: {
        id: '',
        license_plates: "",
        maker: "",
        name: "",
        size: 0,
        status: "",
        type: "",
        warehouse: 0,
        weight: 0,
    }
}

const init_state = {
    ...init_truck_state,
}

const reducer_state = ((state, action) => {
    switch (action.type) {
        case actions.SET_LICENSE_PLATES:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    license_plates: action.license_plates
                }
            }
        case actions.SET_MAKER:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    maker: action.maker
                }
            }
        case actions.SET_NAME:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    name: action.name
                }
            }
        case actions.SET_SIZE:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    size: action.size
                }
            }
        case actions.SET_STATUS:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    status: action.status
                }
            }
        case actions.SET_TYPE:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    type: action.truck_type
                }
            }
        case actions.SET_WAREHOUSE:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    warehouse: action.warehouse
                }
            }
        case actions.SET_WEIGHT:
            return {
                ...state,
                truck: {
                    ...state.truck,
                    weight: action.weight
                }
            }
        default:
            return state;
    }
})

export default {
    init_state,
    reducer_state
}