import { useCallback, useState } from 'react';
import { message } from 'antd';
//actions
import actions from './actions';
//lib
import isEmpty from 'lodash/isEmpty';

const warning = (text) => {
    message.warning(text);
};

const useCalendar = ({ events, new_event, truck, direction_name, dispatchState, handleChangeNewEvent }) => {
    const [dragged_event, setDraggedEvent] = useState(null);

    const handleRangeChange = useCallback(event => {
        if (!isEmpty(event)) {
            if (event.start) {//month
                dispatchState({
                    type: actions.SET_FROM_DATE,
                    from_date: event.start
                })
                dispatchState({
                    type: actions.SET_TO_DATE,
                    to_date: event.end
                })
            } else if (event.length === 1) {//day
                dispatchState({
                    type: actions.SET_FROM_DATE,
                    from_date: event[0]
                })
                dispatchState({
                    type: actions.SET_TO_DATE,
                    to_date: event[0]
                })
            } else if (event.length === 7) {//week
                dispatchState({
                    type: actions.SET_FROM_DATE,
                    from_date: event[0]
                })
                dispatchState({
                    type: actions.SET_TO_DATE,
                    to_date: event[6]
                })
            }
        }
    }, [dispatchState])

    const handleDragStart = event => {
        setDraggedEvent(event)
    }

    const dragFromOutsideItem = () => {
        return dragged_event
    }

    const onDropFromOutside = ({ start, end, allDay }) => {
        const event = {
            id: dragged_event.id,
            title: dragged_event.title,
            start,
            end,
            allDay: allDay,
        }

        setDraggedEvent(null)

        this.moveEvent({ event, start, end })
    }

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        let allDay = event.allDay
        console.log("moveEvent -> allDay", allDay)

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const nextEvents = events.map(existingEvent => {
            return (existingEvent.move && existingEvent.id === event.id)
                ? { ...existingEvent, start, end }
                : existingEvent
        })
        if (!isEmpty(new_event)) {
            handleChangeNewEvent({ ...new_event, start, end })
            dispatchState({
                type: actions.SET_EVENTS,
                events: nextEvents
            })
        }
    }

    const resizeEvent = ({ event, start, end }) => {
        const nextEvents = events.map(existingEvent => {
            return (existingEvent.move && existingEvent.id === event.id)
                ? { ...existingEvent, start, end }
                : existingEvent
        })
        if (!isEmpty(new_event)) {
            handleChangeNewEvent({ ...new_event, start, end })
            dispatchState({
                type: actions.SET_EVENTS,
                events: nextEvents
            })
        }
    }

    const newEvent = (event) => {
        if (isEmpty(new_event)) {
            if (isEmpty(truck)) {
                warning('Vui lòng chọn xe trước');
            } else {
                let new_event = {
                    id: events.length + 1,
                    title: direction_name,
                    allDay: event.slots.length === 1,
                    start: event.start,
                    end: event.end,
                    move: true,
                }
                handleChangeNewEvent(new_event)
                dispatchState({
                    type: actions.SET_EVENTS,
                    events: events.concat([new_event])
                })
            }
        } else {
            warning('Bạn đã chọn thời gian cho tuyến này');
        }
    }

    return {
        handleRangeChange,
        handleDragStart,
        dragFromOutsideItem,
        onDropFromOutside,
        moveEvent,
        resizeEvent,
        newEvent
    }
}

export default useCalendar;