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

/* #region  update direction  */
export function* updateDirection({ params }) {
    try {
        let data = yield call(routeApi.updateDirection, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.updateDirectionSuccess(data.payload));
        } else yield put(routeActions.updateDirectionFailure(data));
    } catch (error) {
        yield put(routeActions.updateDirectionFailure(error));
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

/* #region  get truck directions  */
export function* getTruckDirections({ params }) {
    try {
        let data = yield call(routeApi.getTruckDirections, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.getTruckDirectionsSuccess(data.payload));
        } else yield put(routeActions.getTruckDirectionsFailure(data));
    } catch (error) {
        yield put(routeActions.getTruckDirectionsFailure(error));
    }
}
/* #endregion */

/* #region  get direction  */
export function* getDirection({ params }) {
    try {
        let data = yield call(routeApi.getDirection, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(routeActions.getDirectionSuccess(data.payload));
        } else yield put(routeActions.getDirectionFailure(data));
    } catch (error) {
        yield put(routeActions.getDirectionFailure(error));
    }
}
/* #endregion */