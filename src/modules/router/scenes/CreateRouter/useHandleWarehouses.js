import { useCallback } from 'react';
import actions from './actions';

const useHandleWarehouses = ({ dispatchState }) => {
    const handleChangeWarehouse = useCallback((warehouse) => {
        dispatchState({
            type: actions.SET_WAREHOUSE,
            warehouse
        })
    }, [dispatchState])

    return {
        handleChangeWarehouse
    }
}

export default useHandleWarehouses;