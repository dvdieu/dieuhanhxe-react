import Immutable from "seamless-immutable";

/* #region  get fleets */
export const getFleetsRequest = (state, { params }) => {
    const state_merge = {
        fetch_fleets: true,
        error: {},
    };

    return Immutable.merge(
        state,
        { ...state_merge }
    );
};

export const getFleetsSuccess = (state, { payload, params }) => {
    return Immutable.merge(state, {
        fetch_fleets: false,
        fleets: payload.items,
        pagination: payload.pagination
    });
};

export const getFleetsFailure = (state, { error }) => {
    return Immutable.merge(state, {
        fetch_fleets: false,
        error: {},
    });
};
/* #endregion */