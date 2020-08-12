import { all } from "redux-saga/effects";
import post_saga from "../modules/post/saga";
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
    yield all([
        ...post_saga,
    ]);
}
