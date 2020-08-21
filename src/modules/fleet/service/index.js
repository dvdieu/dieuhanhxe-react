import CoreService from '../../../services/CoreService';

/* #region  get fleets */
export const getFleets = async (params) => {
    const { page } = params;
    try {
        let url = 'https://run.mocky.io/v3/ef545047-4752-448b-82ac-90f4a3af4451'
        if (page === 2) {
            url = 'https://run.mocky.io/v3/2b0e4221-c08e-4eb4-82f9-0b0b94425934'
        }
        const result = await CoreService.get(url);
        return result.data;
    } catch (error) {
        throw error;
    }
}
/* #endregion get fleets */