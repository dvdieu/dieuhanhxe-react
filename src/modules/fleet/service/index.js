import CoreService from '../../../services/CoreService';
import { truck_url } from '../../../config/domains';

/* #region  get fleets */
export const getFleets = async (params) => {
    const { page } = params;
    try {
        let url = 'https://run.mocky.io/v3/0c89ead4-3972-47aa-84f6-3eb1bb4d2ad8'
        if (page === 2) {
            url = 'https://run.mocky.io/v3/150f5a81-3c34-446d-b62d-125f4af15e69'
        }
        const result = await CoreService.get(url);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get fleets */

/* #region  create fleet */
export const createFleet = async (params) => {
    try {
        let url = 'https://run.mocky.io/v3/74d7eee6-d9e5-4509-8656-033a42305035'
        const result = await CoreService.post(url, params);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get fleets */

/* #region  find trucks */
export const findTrucks = async (params) => {
    const body = {
        weight: params.weight,
        size: params.size,
        priority_truck: params.priority_truck
    }
    try {
        let url = `${truck_url}/truck/find`
        const result = await CoreService.post(url, body);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion find trucks */
