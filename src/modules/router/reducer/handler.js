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