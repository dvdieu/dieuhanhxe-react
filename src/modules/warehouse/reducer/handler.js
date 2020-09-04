import Immutable from "seamless-immutable";

/* #region  get Warehouses */
export const getWarehousesRequest = (state, { params }) => {
    const state_merge = {
        fetch_warehouses: true,
        error: {},
    };

    return Immutable.merge(
        state,
        { ...state_merge }
    );
};

export const getWarehousesSuccess = (state, { payload, params }) => {
    return Immutable.merge(state, {
        fetch_warehouses: false,
        warehouses: payload.items,
        pagination: payload.pagination
    });
};

export const getWarehousesFailure = (state, { error }) => {
    return Immutable.merge(state, {
        fetch_warehouses: false,
        error: {},
    });
};
/* #endregion */