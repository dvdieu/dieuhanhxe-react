import actions from './actions';

const initial_state_drawer = {
    truck_visible: false,
    order_visible: false,
}

const hintState = () => {
    const init_state = {
        ...initial_state_drawer,
        info_data: [
            {
                id: 0,
                number_order: 0,
                weight: 0,
                size: 0
            }
        ]
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
            case actions.SET_INFO_DATA:
                return {
                    ...state,
                    info_data: action.info_data
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