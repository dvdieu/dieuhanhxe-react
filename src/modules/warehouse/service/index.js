import CoreService from '../../../services/CoreService';
import { warehouse_url } from '../../../config/domains';

/* #region  get warehouses */
export const getWarehouses = async (params) => {
    try {
        let url = `${warehouse_url}/warehouses`
        const result = await CoreService.get(url);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get warehouses */