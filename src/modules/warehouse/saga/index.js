import { takeLatest } from "redux-saga/effects";

/* ------------- Types ------------- */
import { WarehouseTypes } from "../reducer/actions";
import * as watches from "./watches";

export default [
    takeLatest(WarehouseTypes.GET_WAREHOUSES_REQUEST, watches.getWarehouses),
];
