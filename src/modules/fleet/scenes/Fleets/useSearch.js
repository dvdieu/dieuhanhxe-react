import { useEffect } from 'react';
//lib
import Immutable from "seamless-immutable";
import useDeepCompareEffect from "use-deep-compare-effect";
//config
import { PAGE, SIZE } from '../../../../config/table';

//redux
import { useDispatch, useSelector } from "react-redux";

import FleetActions from '../../reducer/actions';
import actions from './actions';

const useSearch = ({ dispatchState }) => {
    //hook
    const dispatch = useDispatch();
    const fleet_reducer = useSelector((state) => state.fleet_reducer);
    const fleet_as_mutable = Immutable.asMutable(fleet_reducer, { deep: true });
    const { fleets, pagination, fetch_fleets } = fleet_as_mutable;

    useEffect(() => {
        dispatch(FleetActions.getFleetsRequest({ page: PAGE, size: SIZE }))
    }, [dispatch]);

    useDeepCompareEffect(() => {
        dispatchState({
            type: actions.SET_DATA_SOURCE,
            data_source: fleets
        })
    }, [fleets]);

    useDeepCompareEffect(() => {
        dispatchState({
            type: actions.SET_PAGINATION,
            pagination: pagination
        })
    }, [pagination]);

    return {
        fetch_fleets
    }
}

export default useSearch;