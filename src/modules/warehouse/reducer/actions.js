import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
    /* #region  get Warehouses */
    getWarehousesRequest: ['params'],
    getWarehousesSuccess: ['payload'],
    getWarehousesFailure: ['error'],
    /* #endregion */

});

export const WarehouseTypes = Types;
export default Creators;
