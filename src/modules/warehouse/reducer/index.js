
//lib
import Immutable from "seamless-immutable";
import { createReducer } from 'reduxsauce';
//actions
import { WarehouseTypes } from "./actions";
//handle
import * as Handler from "./handler";

const INITIAL_STATE = Immutable({
    error: {},
    pagination: {},
    warehouses: [],
    fetch_warehouses: false,
});

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  get warehouses */
    [WarehouseTypes.GET_WAREHOUSES_REQUEST]: Handler.getWarehousesRequest,
    [WarehouseTypes.GET_WAREHOUSES_SUCCESS]: Handler.getWarehousesSuccess,
    [WarehouseTypes.GET_WAREHOUSES_FAILURE]: Handler.getWarehousesFailure,
    /* #endregion */

});
