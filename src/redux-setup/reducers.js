//lib
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { reducer as post } from '../modules/post/reducer';
import { reducer as fleet } from '../modules/fleet/reducer';
import { reducer as warehouse } from '../modules/warehouse/reducer';
import { reducer as order } from '../modules/order/reducer';
import { reducer as route } from '../modules/router/reducer';

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

const fleetPersistConfig = {
  key: "fleet",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
}

const warehousePersistConfig = {
  key: "warehouse",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
}

const orderPersistConfig = {
  key: "order",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
}

const routePersistConfig = {
  key: "route",
  storage,
  whitelist: [],
  blacklist: ["_persist"],
}

const root_reducer = combineReducers({
  post_reducer: persistReducer(postPersistConfig, post),
  fleet_reducer: persistReducer(fleetPersistConfig, fleet),
  warehouse_reducer: persistReducer(warehousePersistConfig, warehouse),
  order_reducer: persistReducer(orderPersistConfig, order),
  route_reducer: persistReducer(routePersistConfig, route),
});

export default persistReducer(rootPersistConfig, root_reducer);
