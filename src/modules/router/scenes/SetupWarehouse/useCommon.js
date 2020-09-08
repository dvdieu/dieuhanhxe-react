import { useCallback } from 'react';
import actions from './actions';

const useCommon = ({ dispatchState }) => {
    const handleChangeKeyword = useCallback(keyword => {
    console.log("useCommon -> keyword", keyword)
        dispatchState({
            type: actions.SET_KEYWORD,
            keyword
        })
    }, [dispatchState])

    const handleChangeFromDate = useCallback(from_date => {
        dispatchState({
            type: actions.SET_FROM_DATE,
            from_date
        })
    }, [dispatchState])

    const handleChangeToDate = useCallback(to_date => {
        dispatchState({
            type: actions.SET_TO_DATE,
            to_date
        })
    }, [dispatchState])

    const handleChangeUrgency = useCallback(event => {
        dispatchState({
            type: actions.SET_URGENCY,
            urgency: event.target.checked
        })
    }, [dispatchState])

    const handleChangeInDay = useCallback(event => {
        dispatchState({
            type: actions.SET_IN_DAY,
            in_day: event.target.checked
        })
    }, [dispatchState])

    const handleChangeNormal = useCallback(event => {
        dispatchState({
            type: actions.SET_NORMAL,
            normal: event.target.checked
        })
    }, [dispatchState])

    const handleChangeUnset = useCallback(event => {
        dispatchState({
            type: actions.SET_UNSET,
            unset: event.target.checked
        })
    }, [dispatchState])

    const handleChangeReady = useCallback(event => {
        dispatchState({
            type: actions.SET_READY,
            ready: event.target.checked
        })
    }, [dispatchState])

    const handleChangeFinish = useCallback(event => {
        dispatchState({
            type: actions.SET_FINISH,
            finish: event.target.checked
        })
    }, [dispatchState])

    const handleChangeProgress = useCallback(event => {
        dispatchState({
            type: actions.SET_PROGRESS,
            progress: event.target.checked
        })
    }, [dispatchState])

    return {
        handleChangeKeyword,
        handleChangeFromDate,
        handleChangeToDate,
        handleChangeUrgency,
        handleChangeInDay,
        handleChangeNormal,
        handleChangeUnset,
        handleChangeReady,
        handleChangeFinish,
        handleChangeProgress
    }
}

export default useCommon;