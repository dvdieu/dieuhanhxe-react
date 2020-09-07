import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
    /* #region  get fleets */
    getFleetsRequest: ['params'],
    getFleetsSuccess: ['payload'],
    getFleetsFailure: ['error'],
    /* #endregion */

    /* #region  create fleet */
    createFleetRequest: ['params'],
    createFleetSuccess: ['payload'],
    createFleetFailure: ['error'],
    /* #endregion */

    /* #region  find truck */
    findTrucksRequest: ['params'],
    findTrucksSuccess: ['payload'],
    findTrucksFailure: ['error'],
    /* #endregion */


});

export const FleetTypes = Types;
export default Creators;
