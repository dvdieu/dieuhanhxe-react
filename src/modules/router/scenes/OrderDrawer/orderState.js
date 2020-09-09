import actions from './actions';
import { PAGE, SIZE } from '../../../../config/table';

const init_state_table = {
    data_source: [],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_item: 0
    },
    selected_rows: [],
    is_compare: false
}


const init_state = {
    ...init_state_table
}

const reducer_state = ((state, action) => {
    switch (action.type) {
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
        case actions.SET_SELECTED_ROWS:
            return {
                ...state,
                selected_row_keys: action.selected_row_keys,
                selected_rows: action.selected_rows
            }
        case actions.SET_IS_COMPARE:
            return {
                ...state,
                is_compare: action.is_compare
            }
        default:
            return state;
    }
})

export default {
    init_state,
    reducer_state
}