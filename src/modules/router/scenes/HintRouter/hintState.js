import actions from './actions';

const initial_state_drawer = {
    truck_visible: false
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
            default:
                return state;
        }
    })

    return {
        init_state, reducer_state
    }
}

export default hintState;