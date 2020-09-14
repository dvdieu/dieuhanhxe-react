import actions from './actions';
import { PAGE, SIZE } from '../../../../config/table';
//lib
import moment from 'moment';

const initial_state_table = {
    data_source: [],
    pagination: {
        page: PAGE,
        size: SIZE,
        total_items: 0
    },
}

const initial_state_filter = {
    keyword: '',
    from_date: moment().day(1),
    to_date: moment().day(8),
    opening: true,
    promotion: true,
    urgency: true,
    in_day: true,
    delivery_type: true,
    warehouse_type: true,
}

const warehouseState = () => {
    const initial_state = {
        ...initial_state_table,
        ...initial_state_filter,
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
            /* #region  filter */
            case actions.SET_KEYWORD:
                return {
                    ...state,
                    keyword: action.keyword
                }
            case actions.SET_FROM_DATE:
                return {
                    ...state,
                    from_date: action.from_date
                }
            case actions.SET_TO_DATE:
                return {
                    ...state,
                    to_date: action.to_date
                }
            case actions.SET_OPENING:
                return {
                    ...state,
                    opening: action.opening
                }
            case actions.SET_PROMOTION:
                return {
                    ...state,
                    promotion: action.promotion
                }
            case actions.SET_URGENCY:
                return {
                    ...state,
                    urgency: action.urgency
                }
            case actions.SET_IN_DAY:
                return {
                    ...state,
                    in_day: action.in_day
                }
            case actions.SET_DELIVERY_TYPE:
                return {
                    ...state,
                    delivery_type: action.delivery_type
                }
            case actions.SET_WAREHOUSE_TYPE:
                return {
                    ...state,
                    warehouse_type: action.warehouse_type
                }
            /* #endregion */
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