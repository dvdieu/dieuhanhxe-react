//lib
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { reducer as post } from '../modules/post/reducer';

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
};

const postPersistConfig = {
  key: "post",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
}

const root_reducer = combineReducers({
  post_reducer: persistReducer(postPersistConfig, post),
});

export default persistReducer(rootPersistConfig, root_reducer);
