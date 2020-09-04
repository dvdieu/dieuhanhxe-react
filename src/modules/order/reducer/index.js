
//lib
import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
//actions
import { OrderTypes } from './actions';
//handle
import * as Handler from './handler';

const INITIAL_STATE = Immutable({
    error: {},
    pagination: {},
    orders: [],
    fetch_orders: false,
});

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  find orders */
    [OrderTypes.FIND_ORDERS_REQUEST]: Handler.findOrdersRequest,
    [OrderTypes.FIND_ORDERS_SUCCESS]: Handler.findOrdersSuccess,
    [OrderTypes.FIND_ORDERS_FAILURE]: Handler.findOrdersFailure,
    /* #endregion */

});
