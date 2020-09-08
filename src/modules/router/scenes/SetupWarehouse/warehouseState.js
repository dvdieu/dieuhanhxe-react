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
    urgency: true,
    in_day: true,
    normal: true,
    unset: true,
    ready: true,
    finish: true,
    progress: true,
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
            case actions.SET_NORMAL:
                return {
                    ...state,
                    normal: action.normal
                }
            case actions.SET_UNSET:
                return {
                    ...state,
                    unset: action.unset
                }
            case actions.SET_READY:
                return {
                    ...state,
                    ready: action.ready
                }
            case actions.SET_FINISH:
                return {
                    ...state,
                    finish: action.finish
                }
            case actions.SET_PROGRESS:
                return {
                    ...state,
                    progress: action.progress
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