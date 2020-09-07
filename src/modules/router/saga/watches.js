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