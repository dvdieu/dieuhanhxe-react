import CoreService from '../../../services/CoreService';
import { direction_url } from '../../../config/domains';

/* #region  get warehouses */
export const createDirectionTemplate = async (params) => {
    try {
        let url = `${direction_url}/direct`
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get warehouses */