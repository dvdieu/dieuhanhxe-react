import React, { useState } from 'react';
//lib
import moment from 'moment';
import 'moment/locale/vi';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
//components
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

//antd
import { Row, Col, Avatar, Typography, Affix, Modal, message } from 'antd';
//style
import styles from './styles.module.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const { Text } = Typography;

const localizer = momentLocalizer(moment)

let events_data = [
    {
        id: 1,
        title: 'Tuyến 001',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 2,
        title: 'Tuyến 002',
        start: new Date(new Date().setHours(new Date().getHours() + 4)),
        end: new Date(new Date().setHours(new Date().getHours() + 6)),
    },
    {
        id: 3,
        title: 'Tuyến 003',
        start: new Date(new Date().setHours(new Date().getHours() + 4)),
        end: new Date(new Date().setHours(new Date().getHours() + 6)),
    },
    {
        id: 4,
        title: 'Tuyến 004',
        start: new Date(new Date().setHours(new Date().getHours() + 4)),
        end: new Date(new Date().setHours(new Date().getHours() + 6)),
    },
    {
        id: 5,
        title: 'Tuyến 005',
        start: new Date(new Date().setHours(new Date().getHours() + 4)),
        end: new Date(new Date().setHours(new Date().getHours() + 6)),
    },

]

const DragAndDropCalendar = withDragAndDrop(Calendar)

const warning = (text) => {
    message.warning(text);
};

const Schedule = ({ trucks, find_trucks, direction_name, new_event, truck, handleChangeNewEvent, handleChangeTruck }) => {
    const [visible, setVisible] = useState(false);
    const [item_selected, setItemSelected] = useState({});
    const [events, setEvents] = useState(events_data);
    const [dragged_event, setDraggedEvent] = useState(null);
    const displayDragItemInCell = true;

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
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        handleChangeNewEvent({ ...new_event, start, end })
        setEvents(nextEvents)
    }

    const resizeEvent = ({ event, start, end }) => {
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        handleChangeNewEvent({ ...new_event, start, end })
        setEvents(nextEvents)
    }

    const newEvent = (event) => {
        if (isEmpty(new_event)) {
            if (!truck) {
                warning('Vui lòng chọn xe trước');
            } else {
                let idList = events.map(a => a.id)
                let newId = Math.max(...idList) + 1
                let new_event = {
                    id: newId,
                    title: direction_name,
                    allDay: event.slots.length === 1,
                    start: event.start,
                    end: event.end,
                }
                handleChangeNewEvent(new_event)
                setEvents(events.concat([new_event]))
            }
        } else {
            warning('Bạn đã chọn thời gian cho tuyến này');
        }
    }

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const onClickItem = item => {
        setItemSelected(item);
        setVisible(true);
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={4}>
                    <Affix offsetTop={24}>
                        <div className={styles['driver-container']}>
                            {
                                trucks && trucks.map((item, key) => {
                                    const is_selected = item._id === truck._id;
                                    const text_style = styles[`driver-item-text-${is_selected ? 'selected' : 'unselected'}`];
                                    return (
                                        <div className={classnames(
                                            styles['driver-item'],
                                            styles[`driver-item-${is_selected ? 'selected' : 'unselected'}`],
                                            'flex-row')}
                                            key={key}
                                            onClick={() => { handleChangeTruck(item) }}>
                                            <Avatar size={40} src={require('../../../../assets/images/drivers/taixe3.jpeg')} />
                                            <div className={classnames('flex-column', 'justify-between')} style={{ marginLeft: 8 }}>
                                                <Text className={text_style}>{item.license_plates}</Text>
                                                <Text className={text_style}>{item.driver_name}</Text>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Affix>
                </Col>
                <Col xs={20}>
                    <DragAndDropCalendar
                        resizable
                        selectable
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView='week'
                        views={['day', 'week', 'month', 'agenda']}
                        events={events}
                        style={{ height: '600px' }}
                        startAccessor='start'
                        endAccessor='end'
                        popup
                        messages={{
                            next: 'Tiếp theo',
                            previous: 'Trở lại',
                            today: 'Hôm nay',
                            month: 'Tháng',
                            week: 'Tuần',
                            day: 'Ngày',
                            agenda: 'Nhật ký'
                        }}
                        onEventResize={resizeEvent}
                        onSelectSlot={newEvent}
                        onEventDrop={moveEvent}
                        dragFromOutsideItem={
                            displayDragItemInCell ? dragFromOutsideItem : null
                        }
                        onDropFromOutside={onDropFromOutside}
                        handleDragStart={handleDragStart}
                        onSelectEvent={item => onClickItem(item)}
                    />
                </Col>
            </Row>
            <Modal
                title="Thông tin tuyến"
                visible={visible}
                onOk={handleOk}
                okText="Đóng"
                onCancel={handleCancel}
                cancelButtonProps={{ disabled: true, hidden: true }}
            >
                <Text>{item_selected.title}</Text>
                <p>Thông tin...</p>
            </Modal>
        </div>
    )
}

export default React.memo(Schedule);