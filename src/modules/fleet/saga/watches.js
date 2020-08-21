//saga
import { call, put } from "redux-saga/effects";

//service
import * as FleetApi from "../service";

//action
import fleetActions from "../reducer/actions";

//lib
import isEmpty from "lodash/isEmpty";

/* #region  get fleets */
export function* getFleets({ params }) {
    try {
        let data = yield call(FleetApi.getFleets, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(
                fleetActions.getFleetsSuccess(data.payload)
            );
        } else yield put(fleetActions.getFleetsFailure(data));
    } catch (error) {
        yield put(fleetActions.getFleetsFailure(error));
    }
}
/* #endregion */