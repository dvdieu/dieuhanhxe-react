import { useEffect } from 'react';
//actions
import actions from './actions';
import routeActions from '../../reducer/actions';
//redux
import { useDispatch, useSelector } from 'react-redux';
//config
import { PAGE, SIZE } from '../../../../config/table';

const useCommon = ({ dispatchState }) => {
    const dispatch = useDispatch();
    const route_reducer = useSelector(state => state.route_reducer);
    const { find_direction_request, directions } = route_reducer;

    useEffect(() => {
        dispatch(routeActions.findDirectionsRequest({ page: PAGE, size: SIZE }))
    }, [dispatch])

    useEffect(() => {
        dispatchState({
            type: actions.SET_DATA_SOURCE,
            data_source: directions
        })
    }, [directions, dispatchState])

    useEffect(() => {
        dispatchState({
            type: actions.SET_DIRECTION_REQUEST,
            direction_request: find_direction_request
        })
    }, [find_direction_request, dispatchState])
}

export default useCommon;