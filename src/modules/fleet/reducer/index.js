
//lib
import Immutable from "seamless-immutable";
import { createReducer } from 'reduxsauce';
//actions
import { FleetTypes } from "./actions";
//handle
import * as Handler from "./handler";

const INITIAL_STATE = Immutable({
    error: {},
    pagination: {},
    fleets: [],
    fetch_fleets: false

});

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  get fleets */
    [FleetTypes.GET_FLEETS_REQUEST]: Handler.getFleetsRequest,
    [FleetTypes.GET_FLEETS_SUCCESS]: Handler.getFleetsSuccess,
    [FleetTypes.GET_FLEETS_FAILURE]: Handler.getFleetsFailure,
    /* #endregion */
});
