import { useEffect, useCallback } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
//actions
import actions from './actions';
import fleetActions from '../../../fleet/reducer/actions';
//config
import { PAGE, SIZE } from '../../../../config/table';

const useSearch = ({ dispatchState }) => {
    const dispatch = useDispatch();
    const fleet_reducer = useSelector(state => state.fleet_reducer);
    const { fleets, fetch_fleets } = fleet_reducer;

    // useEffect(() => {
    //     dispatch(fleetActions.getFleetsRequest({
    //         page: PAGE,
    //         size: SIZE
    //     }))
    // }, [dispatch]);

    useEffect(() => {
        dispatchState({
            type: actions.SET_DATA_SOURCE,
            data_source: fleets
        })
    }, [fleets, dispatchState])

    const handleSearchFleet = useCallback(({ pagination, filters, sorter }) => {
        dispatch(fleetActions.getFleetsRequest({
            page: pagination.current,
            size: pagination.pageSize
        }))
    }, [dispatch])

    return {
        fetch_fleets,
        handleSearchFleet
    }
}

export default useSearch;