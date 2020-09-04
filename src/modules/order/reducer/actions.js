import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    /* #region  find orders */
    findOrdersRequest: ['params'],
    findOrdersSuccess: ['payload'],
    findOrdersFailure: ['error'],
    /* #endregion */

});

export const OrderTypes = Types;
export default Creators;
