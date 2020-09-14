import { takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { RouteTypes } from "../reducer/actions";
import * as watches from "./watches";

export default [
    takeLatest(RouteTypes.CREATE_DIRECTION_TEMPLATE_REQUEST, watches.createDirectionTemplate),
    takeLatest(RouteTypes.CREATE_DIRECTION_REQUEST, watches.createDirection),
    takeLatest(RouteTypes.UPDATE_DIRECTION_REQUEST, watches.updateDirection),
    takeLatest(RouteTypes.FIND_DIRECTIONS_REQUEST, watches.findDirections),
    takeLatest(RouteTypes.GET_TRUCK_DIRECTIONS_REQUEST, watches.getTruckDirections),
    takeLatest(RouteTypes.GET_DIRECTION_REQUEST, watches.getDirection),
];
