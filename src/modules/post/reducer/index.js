//lib
import { createReducer } from 'reduxsauce';

import Immutable from 'seamless-immutable';

//action types
import { PostTypes } from './actions';

//handler
import * as Handler from './handler';

const INITIAL_STATE = Immutable({
    step: 0,
    show_list: false
})

export const reducer = createReducer(INITIAL_STATE, {
    /* #region  common */
    [PostTypes.SET_STEP]: Handler.setStep,
    [PostTypes.SHOW_LIST]: Handler.showList,
})
