import { all } from "redux-saga/effects";
import post_saga from "../modules/post/saga";
import fleet_saga from '../modules/fleet/saga';
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        ...post_saga,
        ...fleet_saga,
    ]);
}
