import React, { useState, useReducer } from 'react';
//lib
import moment from 'moment';
import 'moment/locale/vi';
import classnames from 'classnames';
//components
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
//antd
import { Row, Col, Avatar, Typography, Affix, Modal, Spin, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
//style
import styles from './styles.module.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
//hook
import { initial_state, reducer_state } from './scheduleState';
import useCommon from './useCommon';
import useCalendar from './useCalendar';

const { Text } = Typography;

const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(Calendar)

const ScheduleDetail = ({ truck, event, goBack, handleChangeSchedule }) => {
    const displayDragItemInCell = true;
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const { trucks, current_truck, current_event, events, fetch_events, from_date, to_date } = state;
    const { handleChangeTruck } = useCommon({ dispatchState, truck, current_truck, from_date, to_date, event, current_event });
    const {
        handleRangeChange,
        handleDragStart,
        dragFromOutsideItem,
        onDropFromOutside,
        moveEvent,
        resizeEvent,
        newEvent
    } = useCalendar({ dispatchState, events })

    const onSaveSchedule = () => {
        handleChangeSchedule({ current_event, current_truck })
        goBack();
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={4}>
                    <Affix offsetTop={24}>
                        <div className={styles['driver-container']}>
                            {
                                trucks && trucks.map((item, key) => {
                                    const is_selected = item.license_plates === current_truck.license_plates;
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
                                                <Text className={text_style}>{`${item.weight / 1000} tấn`}</Text>
                                                <Text className={text_style}>{`${item.size} khối`}</Text>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Affix>
                </Col>
                <Col xs={20}>
                    <Spin spinning={fetch_events} delay={500}>
                        <DragAndDropCalendar
                            resizable
                            selectable
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView='week'
                            views={['day', 'week', 'month']}
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
                            // onSelectEvent={item => onClickItem(item)}
                            onRangeChange={handleRangeChange}
                            eventPropGetter={event => ({
                                style: {
                                    background: event.move ? '#ff9900' : '#2A3F54',
                                    border: `1px solid ${event.move ? '#ff9900' : '#2A3F54'}`
                                }
                            })}
                        />
                    </Spin>
                </Col>
            </Row>
            {/* <Modal
                title="Thông tin tuyến"
                visible={visible}
                // onOk={handleOk}
                // okText="Đóng"
                onCancel={handleCancel}
                // cancelButtonProps={{ disabled: true, hidden: true }}
                footer={
                    <div className={classnames('flex-row', `justify-${item_selected.move ? 'between' : 'end'}`)}>
                        {
                            item_selected.move &&
                            <Button type='link' icon={<DeleteOutlined />} danger>{"Xóa"}</Button>
                        }
                        <Button type='primary' onClick={handleCancel}>{"Đóng"}</Button>
                    </div>
                }
            >
                <Text>{item_selected.title}</Text>
                <p>Thông tin...</p>
            </Modal> */}
            <div
                id="root_footer"
                className={styles.footer}
            >
                <div className={classnames('flex-row', 'justify-end')} style={{ padding: '12px 0px' }}>
                    <Button type='default' style={{ marginRight: 12 }} onClick={goBack}>{"Hủy"}</Button>
                    <Button type='primary' onClick={onSaveSchedule}>{"Lưu"}</Button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ScheduleDetail);