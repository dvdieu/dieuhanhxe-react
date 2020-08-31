import { takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { FleetTypes } from "../reducer/actions";
import * as watches from "./watches";

export default [
    takeLatest(FleetTypes.GET_FLEETS_REQUEST, watches.getFleets),
    takeLatest(FleetTypes.CREATE_FLEET_REQUEST, watches.createFleet),
];
