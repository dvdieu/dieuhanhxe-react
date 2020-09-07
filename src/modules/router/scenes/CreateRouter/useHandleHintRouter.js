//redux
import { useDispatch } from 'react-redux';
//actions
import routeActions from '../../reducer/actions';
import actions from './actions';

const useHandleHintRouter = ({
    warehouse,
    priority_warehouse,
    priority_truck,
    selected_order,
    dispatchState
}) => {
    const dispatch = useDispatch();

    const createDirectionTemplate = () => {
        const params = {
            warehouse,
            setup: {
                priority_warehouse,
                priority_truck,
            },
            orders: [...selected_order]
        }
        dispatch(routeActions.createDirectionTemplateRequest(params));
        dispatchState({
            type: actions.SET_STEP,
            step: 2
        })
    }


    return {
        createDirectionTemplate
    }
}

export default useHandleHintRouter;