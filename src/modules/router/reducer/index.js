
//lib
import Immutable from "seamless-immutable";
import { createReducer } from 'reduxsauce';
//actions
import { RouteTypes } from "./actions";
//handle
import * as Handler from "./handler";

const INITIAL_STATE = Immutable({
    direction_templates: [],
    directions: [],
    direct_template_id: '',
    create_direction_template_request: false,
    create_direction_request: false,
    update_direction_request: false,
    find_direction_request: false,
    truck_directions: [],
    get_truck_direction_request: false,
    direction: {},
    error: {},
    direction_error: {}
});

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  create direction template*/
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_REQUEST]: Handler.createDirectionTemplateRequest,
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_SUCCESS]: Handler.createDirectionTemplateSuccess,
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_FAILURE]: Handler.createDirectionTemplateFailure,
    /* #endregion */

    /* #region  create direction */
    [RouteTypes.CREATE_DIRECTION_REQUEST]: Handler.createDirectionRequest,
    [RouteTypes.CREATE_DIRECTION_SUCCESS]: Handler.createDirectionSuccess,
    [RouteTypes.CREATE_DIRECTION_FAILURE]: Handler.createDirectionFailure,
    /* #endregion */

    /* #region  update direction */
    [RouteTypes.UPDATE_DIRECTION_REQUEST]: Handler.updateDirectionRequest,
    [RouteTypes.UPDATE_DIRECTION_SUCCESS]: Handler.updateDirectionSuccess,
    [RouteTypes.UPDATE_DIRECTION_FAILURE]: Handler.updateDirectionFailure,
    /* #endregion */

    /* #region  find directions */
    [RouteTypes.FIND_DIRECTIONS_REQUEST]: Handler.findDirectionsRequest,
    [RouteTypes.FIND_DIRECTIONS_SUCCESS]: Handler.findDirectionsSuccess,
    [RouteTypes.FIND_DIRECTIONS_FAILURE]: Handler.findDirectionsFailure,
    /* #endregion */

    /* #region  get truck directions */
    [RouteTypes.GET_TRUCK_DIRECTIONS_REQUEST]: Handler.getTruckDirectionsRequest,
    [RouteTypes.GET_TRUCK_DIRECTIONS_SUCCESS]: Handler.getTruckDirectionsSuccess,
    [RouteTypes.GET_TRUCK_DIRECTIONS_FAILURE]: Handler.getTruckDirectionsFailure,
    /* #endregion */

     /* #region  get direction */
     [RouteTypes.GET_DIRECTION_REQUEST]: Handler.getDirectionRequest,
     [RouteTypes.GET_DIRECTION_SUCCESS]: Handler.getDirectionSuccess,
     [RouteTypes.GET_DIRECTION_FAILURE]: Handler.getDirectionFailure,
     /* #endregion */
});
