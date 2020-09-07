import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
    /* #region  create template direction */
    createDirectionTemplateRequest: ['params'],
    createDirectionTemplateSuccess: ['payload'],
    createDirectionTemplateFailure: ['error'],
    /* #endregion */

    /* #region  create direction */
    createDirectionRequest: ['params'],
    createDirectionSuccess: ['payload'],
    createDirectionFailure: ['error'],
    /* #endregion */

    /* #region  find direction */
    findDirectionsRequest: ['params'],
    findDirectionsSuccess: ['payload'],
    findDirectionsFailure: ['error'],
    /* #endregion */

});

export const RouteTypes = Types;
export default Creators;
