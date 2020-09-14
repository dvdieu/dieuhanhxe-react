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

/* #region  update direction */
export const updateDirection = async (params) => {
    try {
        let url = `${direction_url}/direct/${params.id}`
        const result = await CoreService.put(url, params.body);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion update direction */

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

/* #region  get directions */
export const getTruckDirections = async (params) => {
    try {
        let url = `${direction_url}/direct/license-and-period`
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get directions */

/* #region  get direction */
export const getDirection = async (params) => {
    try {
        let url = `${direction_url}/direct/${params.id}`
        const result = await CoreService.get(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get direction */