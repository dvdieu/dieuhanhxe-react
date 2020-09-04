//saga
import { call, put } from "redux-saga/effects";

//service
import * as warehouseApi from "../service";

//action
import warehouseActions from "../reducer/actions";

//lib
import isEmpty from "lodash/isEmpty";

/* #region  get Warehouses */
export function* getWarehouses({ params }) {
    try {
        let data = yield call(warehouseApi.getWarehouses, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(warehouseActions.getWarehousesSuccess(data.payload));
        } else yield put(warehouseActions.getWarehousesFailure(data));
    } catch (error) {
        yield put(warehouseActions.getWarehousesFailure(error));
    }
}
/* #endregion */