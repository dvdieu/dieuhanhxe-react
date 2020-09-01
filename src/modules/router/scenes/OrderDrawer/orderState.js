import actions from './actions';
import { PAGE, SIZE } from '../../../../config/table';

const init_state_table = {
    data_source: [
        {
            id: 6,
            address: '20 Kim Mã',
            quantity: '20',
            weight: '20',
            size: '20',
            truck: '37M1 - 14542',
            route: 'Tuyến 001'
        },
        {
            id: 7,
            address: '30 Kim Mã',
            quantity: '30',
            weight: '30',
            size: '30',
            truck: 'Chưa có',
            route: 'Chưa có'
        },
    ],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_item: 12
    },
    selected_rows: []
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
        default:
            return state;
    }
})

export default {
    init_state,
    reducer_state
}