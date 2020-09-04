import CoreService from '../../../services/CoreService';
import { order_url } from '../../../config/domains';

/* #region  find orders */
export const findOrders = async (params) => {
    try {
        let url = `${order_url}/orders`
        const result = await CoreService.get(url);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion find orders */