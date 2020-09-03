import actions from './actions';
import cloneDeep from 'lodash/cloneDeep';

const initial_state_drawer = {
    truck_visible: false,
    order_visible: false,
    orders: [
        {
            id: 1,
            address: '10 Trần Xuân Soạn, phường Phạm Đình Hổ, quận Hai Bà Trưng, Hà Nội',
            quantity: 15,
            weight: 1.25,
            size: 15,
            warning: ''
        },
        {
            id: 2,
            address: 'KTX ĐH kinh tế quốc dân, phường Đồng Tâm, quận Hai Bà Trưng, Hà Nội',
            quantity: 10,
            weight: 1,
            size: 10,
            warning: ''
        },
        {
            id: 3,
            address: 'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Hà Nội',
            quantity: 5,
            weight: 0.5,
            size: 5,
            warning: ''
        },
        {
            id: 4,
            address: 'Đức Lan 91 Thanh Nhàn, phường Quỳnh Mai, quận Hai Bà Trưng, Hà Nội',
            quantity: 10,
            weight: 1.5,
            size: 15,
            warning: 'Quá trọng tải'
        }
    ],

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