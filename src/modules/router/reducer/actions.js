import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
    /* #region  create direction */
    createDirectionTemplateRequest: ['params'],
    createDirectionTemplateSuccess: ['payload'],
    createDirectionTemplateFailure: ['error'],
    /* #endregion */

});

export const RouteTypes = Types;
export default Creators;
