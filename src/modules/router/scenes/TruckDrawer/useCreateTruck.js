import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
//actions
import actions from './actions';
import fleetActions from '../../../fleet/reducer/actions';
//truck-create-drawer
const useCreateTruck = ({ dispatchState }) => {
    const dispatch = useDispatch();

    const handleCloseTruckDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_CREATE_TRUCK_VISIBLE,
            create_truck_visible: false
        })
    }, [dispatchState])

    const handleOpenTruckDrawer = useCallback(() => {
        dispatchState({
            type: actions.SET_CREATE_TRUCK_VISIBLE,
            create_truck_visible: true
        })
    }, [dispatchState])

    const handleCreateTruck = useCallback(truck => {
        dispatch(fleetActions.createFleetRequest({ truck }));
        handleCloseTruckDrawer();
    }, [dispatch, handleCloseTruckDrawer])

    return {
        handleCloseTruckDrawer,
        handleOpenTruckDrawer,
        handleCreateTruck
    }
}

export default useCreateTruck;