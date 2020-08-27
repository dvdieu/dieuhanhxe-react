import actions from './actions';
import { PAGE, SIZE } from '../../../../config/table';
import { TRUCK_SIZE } from '../../../../variables/truck';

const initial_state_table = {
    data_source: [{
        id: 'HD001',
        address: '04 Thụy Khê',
        priority: '40',
        status: 'Khẩn cấp'
    },
    {
        id: 'HD002',
        address: 'Vinmart + 182 Lê Đại Hành',
        priority: '38',
        status: 'Giao trong ngày'
    },
    {
        id: 'HD003',
        address: '36 Hoàng Cầu',
        priority: 'Bình thường',
        status: 'Đã giao'
    },
    {
        id: 'HD004',
        address: '01 Cổ Nhuế',
        priority: 'Bình thường',
        status: 'Chưa sắp lịch'
    }],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 0
    },
    selected_row_keys: []
}

const initial_state_priority = {
    priority_warehouse: false,
    priority_truck: TRUCK_SIZE.LARGE
}

const warehouseState = () => {
    const initial_state = {
        ...initial_state_table,
        ...initial_state_priority,
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
            case actions.SET_SELECTED_ROW_KEYS:
                return {
                    ...state,
                    selected_row_keys: action.selected_row_keys
                }
            case actions.SET_PRIORITY_WAREHOUSE:
                return {
                    ...state,
                    priority_warehouse: action.priority_warehouse
                }
            case actions.SET_PRIORITY_TRUCK:
                return {
                    ...state,
                    priority_truck: action.priority_truck
                }
            default:
                return state;
        }
    });

    return {
        initial_state,
        reducer_state
    }
}

export default warehouseState;