//lib
import Immutable from "seamless-immutable";

export const setStep = (state, { params }) => {
    return Immutable.merge(state, {
        ...params
    });
};

export const showList = (state, { params }) => {
    return Immutable.merge(state, {
        show_list: true
    })
}