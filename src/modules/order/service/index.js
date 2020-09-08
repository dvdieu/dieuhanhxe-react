import CoreService from '../../../services/CoreService';
import { order_url } from '../../../config/domains';

/* #region  find orders */
export const findOrders = async (params) => {
    const { page, size } = params;
    const body = {
        warehouse_id: params.warehouse_id,
        keyword: params.keyword,
        from_date: params.from_date,
        to_date: params.to_date,
        priority: params.priority,
        status: params.status,
    }
    try {
        let url = `${order_url}/order/find?page=${page}&size=${size}`
        const result = await CoreService.post(url, body);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion find orders */