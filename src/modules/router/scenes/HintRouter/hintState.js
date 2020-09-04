import actions from './actions';
import cloneDeep from 'lodash/cloneDeep';

const initial_state_drawer = {
    truck_visible: false,
    order_visible: false,
    orders: [],
}

const init_state_location = {
    address: '',
    dodge_address: [
        {
            STT: 1,
            address: '25 Trần Xuân Soạn'
        },
        {
            STT: 2,
            address: '30 Đinh Tiên Hoàng'
        }
    ]
}

const hintState = () => {
    const init_state = {
        ...initial_state_drawer,
        ...init_state_location
    }

    const reducer_state = ((state, action) => {
        switch (action.type) {
            case actions.SET_TRUCK_VISIBLE:
                return {
                    ...state,
                    truck_visible: action.truck_visible
                }
            case actions.SET_ORDER_VISIBLE:
                return {
                    ...state,
                    order_visible: action.order_visible
                }
            case actions.SET_ORDERS:
                let orders = cloneDeep(state.orders);
                orders = [...action.orders, ...orders];
                return {
                    ...state,
                    orders
                }
            case actions.ADD_DODGE_ADDRESS:
                let dodge_address = cloneDeep(state.dodge_address);
                dodge_address = [...dodge_address, action.address];
                return {
                    ...state,
                    dodge_address
                }
            case actions.SET_ADDRESS:
                return {
                    ...state,
                    address: action.address
                }
            default:
                return state;
        }
    })

    return {
        init_state, reducer_state
    }
}

export default hintState;