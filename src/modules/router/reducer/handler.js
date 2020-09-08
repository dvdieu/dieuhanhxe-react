import Immutable from "seamless-immutable";

/* #region  create direction template */
export const createDirectionTemplateRequest = (state, { params }) => {
    return Immutable.merge(state, {
        create_direction_template_request: true,
        direction_templates: [],
        error: {}
    });
};

export const createDirectionTemplateSuccess = (state, { payload }) => {

    return Immutable.merge(state, {
        create_direction_template_request: false,
        direction_templates: payload.directs,
        direct_template_id: payload.direct_template_id
    });
};

export const createDirectionTemplateFailure = (state, { error }) => {
    return Immutable.merge(state, {
        create_direction_template_request: false,
        direct_template_id: '',
        direction_templates: [],
        error,
    });
};
/* #endregion */

/* #region  create direction  */
export const createDirectionRequest = (state, { params }) => {
    return Immutable.merge(state, {
        create_direction_request: true,
        error: {}
    });
};

export const createDirectionSuccess = (state, { payload }) => {
    return Immutable.merge(state, {
        create_direction_request: false,
    });
};

export const createDirectionFailure = (state, { error }) => {
    return Immutable.merge(state, {
        create_direction_request: false,
        error,
    });
};
/* #endregion */

/* #region  find direction  */
export const findDirectionsRequest = (state, { params }) => {
    return Immutable.merge(state, {
        find_direction_request: true,
        directions: [],
        error: {}
    });
};

export const findDirectionsSuccess = (state, { payload }) => {
    return Immutable.merge(state, {
        find_direction_request: false,
        directions: payload.items,

    });
};

export const findDirectionsFailure = (state, { error }) => {
    return Immutable.merge(state, {
        find_direction_request: false,
        directions: [],
        error,
    });
};
/* #endregion */

/* #region  get truck directions  */
export const getTruckDirectionsRequest = (state, { params }) => {
    return Immutable.merge(state, {
        get_truck_direction_request: true,
        truck_directions: [],
        error: {}
    });
};

export const getTruckDirectionsSuccess = (state, { payload }) => {
    return Immutable.merge(state, {
        get_truck_direction_request: false,
        truck_directions: payload,
    });
};

export const getTruckDirectionsFailure = (state, { error }) => {
    return Immutable.merge(state, {
        get_truck_direction_request: false,
        truck_directions: [],
        error,
    });
};
/* #endregion */