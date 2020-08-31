import { useCallback } from 'react';
//actions
import actions from './actions';

const useCommon = ({ dispatchState }) => {
    const handleChangeLicense = useCallback((event) => {
        dispatchState({
            type: actions.SET_LICENSE_PLATES,
            license_plates: event.target.value
        })
    }, [dispatchState]);

    const handleChangeName = useCallback(event => {
        dispatchState({
            type: actions.SET_NAME,
            name: event.target.value
        })
    }, [dispatchState])

    const handleChangeMaker = useCallback(value => {
        dispatchState({
            type: actions.SET_MAKER,
            maker: value
        })
    }, [dispatchState])

    const handleChangeType = useCallback(value => {
        dispatchState({
            type: actions.SET_TYPE,
            truck_type: value
        })
    }, [dispatchState])

    const handleChangeWarehouse = useCallback(value => {
        dispatchState({
            type: actions.SET_WAREHOUSE,
            warehouse: value
        })
    }, [dispatchState])

    const handleChangeWeight = useCallback(value => {
        dispatchState({
            type: actions.SET_WEIGHT,
            weight: value
        })
    }, [dispatchState])

    const handleChangeSize = useCallback(value => {
        dispatchState({
            type: actions.SET_SIZE,
            size: value
        })
    }, [dispatchState])

    return {
        handleChangeLicense,
        handleChangeName,
        handleChangeMaker,
        handleChangeType,
        handleChangeWarehouse,
        handleChangeWeight,
        handleChangeSize
    }
}

export default useCommon;