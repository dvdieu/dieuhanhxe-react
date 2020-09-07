import { takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { RouteTypes } from "../reducer/actions";
import * as watches from "./watches";

export default [
    takeLatest(RouteTypes.CREATE_DIRECTION_TEMPLATE_REQUEST, watches.createDirectionTemplate),
];
