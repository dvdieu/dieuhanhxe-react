import CoreService from '../../../services/CoreService';
import { direction_url } from '../../../config/domains';

/* #region  create direction template*/
export const createDirectionTemplate = async (params) => {
    try {
        let url = `${direction_url}/direct/template`
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion create direction */

/* #region  create direction */
export const createDirection = async (params) => {
    try {
        let url = `${direction_url}/direct`
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion create direction */

/* #region  get directions */
export const findDirections = async (params) => {
    try {
        let url = `${direction_url}/direct/find`
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get directions */