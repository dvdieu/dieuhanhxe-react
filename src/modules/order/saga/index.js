import { takeLatest } from 'redux-saga/effects';

/* ------------- Types ------------- */
import { OrderTypes } from '../reducer/actions';
import * as watches from './watches';

export default [
    takeLatest(OrderTypes.FIND_ORDERS_REQUEST, watches.findOrders),
];
