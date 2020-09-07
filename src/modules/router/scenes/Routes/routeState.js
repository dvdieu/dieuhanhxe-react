import { PAGE, SIZE } from '../../../../config/table';
import actions from './actions';

const initial_state_table = {
    data_source: [],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 0
    },
    direction_request: false
}

export const initial_state = {
    ...initial_state_table
}

export const reducer_state = ((state, action) => {
    switch (action.type) {
        case actions.SET_DATA_SOURCE:
            console.log("reducer_state -> action", action.data_source)
            return {
                ...state,
                data_source: action.data_source
            }
        case actions.SET_PAGINATION:
            return {
                ...state,
                pagination: action.pagination
            }
        case actions.SET_DIRECTION_REQUEST:
            return {
                ...state,
                direction_request: action.direction_request
            }
        default:
            return state;
    }
})