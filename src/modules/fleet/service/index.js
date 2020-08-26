import CoreService from '../../../services/CoreService';

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