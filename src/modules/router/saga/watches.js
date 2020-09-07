//saga
import { call, put } from "redux-saga/effects";

//service
import * as routeApi from "../service";

//action
import routeActions from "../reducer/actions";

//lib
import isEmpty from "lodash/isEmpty";

/* #region  create direction template */
export function* createDirectionTemplate({ params }) {
    try {
        let data = yield call(routeApi.createDirectionTemplate, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.createDirectionTemplateSuccess(data.payload));
        } else yield put(routeActions.createDirectionTemplateFailure(data));
    } catch (error) {
        yield put(routeActions.createDirectionTemplateFailure(error));
    }
}
/* #endregion */

/* #region  create direction  */
export function* createDirection({ params }) {
    try {
        let data = yield call(routeApi.createDirection, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.createDirectionSuccess(data.payload));
        } else yield put(routeActions.createDirectionFailure(data));
    } catch (error) {
        yield put(routeActions.createDirectionFailure(error));
    }
}
/* #endregion */

/* #region  find directions  */
export function* findDirections({ params }) {
    try {
        let data = yield call(routeApi.findDirections, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.findDirectionsSuccess(data.payload));
        } else yield put(routeActions.findDirectionsFailure(data));
    } catch (error) {
        yield put(routeActions.findDirectionsFailure(error));
    }
}
/* #endregion */