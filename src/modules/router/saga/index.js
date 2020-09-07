import { takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { RouteTypes } from "../reducer/actions";
import * as watches from "./watches";

export default [
    takeLatest(RouteTypes.CREATE_DIRECTION_TEMPLATE_REQUEST, watches.createDirectionTemplate),
    takeLatest(RouteTypes.CREATE_DIRECTION_REQUEST, watches.createDirection),
    takeLatest(RouteTypes.FIND_DIRECTIONS_REQUEST, watches.findDirections),
];
