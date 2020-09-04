//saga
import { call, put } from "redux-saga/effects";

//service
import * as orderApi from "../service";

//action
import orderActions from "../reducer/actions";

//lib
import isEmpty from "lodash/isEmpty";

/* #region  find orders */
export function* findOrders({ params }) {
    try {
        let data = yield call(orderApi.findOrders, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(orderActions.findOrdersSuccess(data.payload));
        } else yield put(orderActions.findOrdersFailure(data));
    } catch (error) {
        yield put(orderActions.findOrdersFailure(error));
    }
}
/* #endregion */