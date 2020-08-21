import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
    /* #region  get fleets */
    getFleetsRequest: ['params'],
    getFleetsSuccess: ['payload'],
    getFleetsFailure: ['error'],
    /* #endregion */

});

export const FleetTypes = Types;
export default Creators;
