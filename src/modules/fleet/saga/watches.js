//saga
import { call, put } from "redux-saga/effects";

//service
import * as FleetApi from "../service";

//action
import fleetActions from "../reducer/actions";

//lib
import isEmpty from "lodash/isEmpty";

//antd
import { message } from 'antd';

/* #region  get fleets */
export function* getFleets({ params }) {
    try {
        let data = yield call(FleetApi.getFleets, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(fleetActions.getFleetsSuccess(data.payload));
        } else yield put(fleetActions.getFleetsFailure(data));
    } catch (error) {
        yield put(fleetActions.getFleetsFailure(error));
    }
}
/* #endregion */

/* #region  create fleet */
export function* createFleet({ params }) {
    try {
        let data = yield call(FleetApi.createFleet, params);
        if (!isEmpty(data) && data.status_code === 200) {
            //note
            params.truck.id = data.payload.id;
            message.success('Thêm xe thành công');
            yield put(fleetActions.createFleetSuccess(params.truck));
            // yield put(fleetActions.createFleetSuccess(data.payload));
        } else {
            message.success('Đã xảy ra lỗi khi thêm xe');
            yield put(fleetActions.createFleetFailure(data));
        }
    } catch (error) {
        yield put(fleetActions.createFleetFailure(error));
    }
}
/* #endregion */

/* #region  get fleets */
export function* findTrucks({ params }) {
    try {
        let data = yield call(FleetApi.findTrucks, params);
        if (!isEmpty(data) && data.status_code === 200) {
            yield put(fleetActions.findTrucksSuccess(data.payload));
        } else yield put(fleetActions.findTrucksFailure(data));
    } catch (error) {
        yield put(fleetActions.findTrucksFailure(error));
    }
}
/* #endregion */