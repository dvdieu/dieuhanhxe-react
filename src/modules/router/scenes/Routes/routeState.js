import { PAGE, SIZE } from '../../../../config/table';
import actions from './actions';

const initial_state_table = {
    data_source: [],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 0
    }
}

export const initial_state = {
    ...initial_state_table
}

export const reducer_state = ((state, action) => {
    switch (action.key) {
        case actions.SET_DATA_SOURCE:
            return {
                ...state,
                data_source: action.data_source
            }
        case actions.SET_PAGINATION:
            return {
                ...state,
                pagination: action.pagination
            }
        default:
            return state;
    }
})