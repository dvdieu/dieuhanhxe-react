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
    ]
}

const hintState = () => {
    const init_state = {
        ...initial_state_drawer
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
            default:
                return state;
        }
    })

    return {
        init_state, reducer_state
    }
}

export default hintState;