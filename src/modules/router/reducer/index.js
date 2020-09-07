
//lib
import Immutable from "seamless-immutable";
import { createReducer } from 'reduxsauce';
//actions
import { RouteTypes } from "./actions";
//handle
import * as Handler from "./handler";

const INITIAL_STATE = Immutable({
    error: {},
    direction_templates: [],
    direct_template_id: '',
    create_direction_template_request: false
});

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  get warehouses */
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_REQUEST]: Handler.createDirectionTemplateRequest,
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_SUCCESS]: Handler.createDirectionTemplateSuccess,
    [RouteTypes.CREATE_DIRECTION_TEMPLATE_FAILURE]: Handler.createDirectionTemplateFailure,
    /* #endregion */

});
