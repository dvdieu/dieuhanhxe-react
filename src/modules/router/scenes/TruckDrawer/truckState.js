import { PAGE, SIZE } from '../../../../config/table';
import actions from './actions';

const initial_state_table = {
    data_source: [
        {
            license_plates: '29-C1 14242',
            name: 'THACO',
            type: 'normal',
            weight: 1.25,
            size: 15,
            route: 'Chưa có tuyến'
        },
        {
            license_plates: '29-C1 24532',
            name: 'Isuzu',
            type: 'normal',
            weight: 2.1,
            size: 21,
            route: 'Tuyến 002'
        },
        {
            license_plates: '29-C1 42574',
            name: 'THACO',
            type: 'cold',
            weight: 1.5,
            size: 17,
            route: 'Tuyến 002'
        }
    ],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 12
    },
    selected_rows: [],
}

const truckState = () => {
    const initial_state = {
        ...initial_state_table
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
                    selected_rows: action.selected_rows
                }
            default:
                return state;
        }
    })

    return {
        initial_state, reducer_state
    }
}

export default truckState;