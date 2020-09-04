import { all } from "redux-saga/effects";
import post_saga from "../modules/post/saga";
import fleet_saga from '../modules/fleet/saga';
import warehouse_saga from '../modules/warehouse/saga';
import order_saga from '../modules/order/saga';
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        ...post_saga,
        ...fleet_saga,
        ...warehouse_saga,
        ...order_saga,
    ]);
}
