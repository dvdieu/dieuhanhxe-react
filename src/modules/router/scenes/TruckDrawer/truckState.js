import { PAGE, SIZE } from '../../../../config/table';
import actions from './actions';

const initial_state_table = {
    data_source: [
        // {
        //     license_plates: '29-C1 14242',
        //     name: 'THACO',
        //     type: 'normal',
        //     weight: 1.25,
        //     size: 15,
        //     route: 'Chưa có tuyến'
        // },
    ],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 12
    },
    selected_rows: [],
}

const init_state_drawer = {
    create_truck_visible: false,
}

const truckState = () => {
    const initial_state = {
        ...initial_state_table,
        ...init_state_drawer
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
            case actions.SET_CREATE_TRUCK_VISIBLE:
                return {
                    ...state,
                    create_truck_visible: action.create_truck_visible
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