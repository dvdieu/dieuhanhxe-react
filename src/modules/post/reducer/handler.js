//lib
import Immutable from "seamless-immutable";

export const setStep = (state, { params }) => {
    return Immutable.merge(state, {
        ...params
    });
};
