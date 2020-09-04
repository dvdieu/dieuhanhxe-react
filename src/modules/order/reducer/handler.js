import Immutable from 'seamless-immutable';

/* #region  find orders */
export const findOrdersRequest = (state, { params }) => {
    const state_merge = {
        fetch_orders: true,
        error: {},
    };

    return Immutable.merge(
        state,
        { ...state_merge }
    );
};

export const findOrdersSuccess = (state, { payload, params }) => {
    return Immutable.merge(state, {
        fetch_orders: false,
        orders: payload.items,
        pagination: payload.pagination
    });
};

export const findOrdersFailure = (state, { error }) => {
    return Immutable.merge(state, {
        fetch_orders: false,
        error: {},
    });
};
/* #endregion */