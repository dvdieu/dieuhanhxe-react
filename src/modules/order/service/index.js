import CoreService from '../../../services/CoreService';
import { order_url } from '../../../config/domains';

/* #region  find orders */
export const findOrders = async (params) => {
    const { page, size } = params;
    const body = {
        warehouse_id: params.warehouse_id
    }
    try {
        let url = `${order_url}/orders?page=${page}&size=${size}`
        const result = await CoreService.post(url, body);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion find orders */