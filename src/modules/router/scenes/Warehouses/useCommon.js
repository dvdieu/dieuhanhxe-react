import { useEffect } from 'react';
//redux
import { useDispatch } from 'react-redux';
//actions
import warehouseActions from '../../../warehouse/reducer/actions';
import { PAGE, SIZE } from '../../../../config/table';

const useCommon = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(warehouseActions.getWarehousesRequest({
            page: PAGE,
            size: SIZE
        }))
    }, [dispatch])
}

export default useCommon;