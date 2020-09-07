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

/* #region  create fleet */
export const createFleetRequest = (state, { params }) => {
    const state_merge = {
        create_fleet: true,
        fetch_fleets: true,
        error: {},
    };

    return Immutable.merge(
        state,
        { ...state_merge }
    );
};

export const createFleetSuccess = (state, { payload, params }) => {
    let fleets = Immutable.asMutable(state.fleets, { deep: true });
    fleets.pop();
    let pagination = Immutable.asMutable(state.pagination, { deep: true });
    pagination.total_items += 1;
    return Immutable.merge(state, {
        create_fleet: false,
        fetch_fleets: false,
        fleets: [payload, ...fleets],
        pagination
    });
};

export const createFleetFailure = (state, { error }) => {
    return Immutable.merge(state, {
        create_fleet: false,
        fetch_fleets: false,
        error: {},
    });
};
/* #endregion */

/* #region find trucks */
export const findTrucksRequest = (state, { params }) => {
    const state_merge = {
        find_trucks: true,
        error: {},
    };

    return Immutable.merge(
        state,
        { ...state_merge }
    );
};

export const findTrucksSuccess = (state, { payload, params }) => {
    return Immutable.merge(state, {
        find_trucks: false,
        trucks: payload.items,
    });
};

export const findTrucksFailure = (state, { error }) => {
    return Immutable.merge(state, {
        find_trucks: false,
        error: {},
    });
};
/* #endregion */