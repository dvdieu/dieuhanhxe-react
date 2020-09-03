import React, { useState } from 'react';
//lib
import moment from 'moment';
import 'moment/locale/vi';
import classnames from 'classnames';
//components
import { Calendar, momentLocalizer } from 'react-big-calendar'
//antd
import { Row, Col, Avatar, Typography, Affix, Modal } from 'antd';
//style
import styles from './styles.module.scss';

const { Text } = Typography;

const localizer = momentLocalizer(moment)

const drivers = [
    {
        id: 1,
        license_plates: '73-M1 00001',
        driver_name: 'Nguyễn Văn A',
    },
    {
        id: 2,
        license_plates: '73-M1 00002',
        driver_name: 'Nguyễn Văn B',
    },
    {
        id: 3,
        license_plates: '73-M1 00003',
        driver_name: 'Nguyễn Văn C',
    },
    {
        id: 4,
        license_plates: '73-M1 00004',
        driver_name: 'Nguyễn Văn D',
    },
    {
        id: 5,
        license_plates: '73-M1 00005',
        driver_name: 'Nguyễn Văn E',
    },
    {
        id: 6,
        license_plates: '73-M1 00006',
        driver_name: 'Nguyễn Văn F',
    },
    {
        id: 7,
        license_plates: '73-M1 00007',
        driver_name: 'Nguyễn Văn G',
    }
]

const events = [
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

const Schedule = () => {
    const [selected, setSelected] = useState(1);
    const [visible, setVisible] = useState(false);
    const [item_selected, setItemSelected] = useState({});

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleChangeDriver = item => {
        setSelected(item.id)
    }

    const onClickItem = item => {
        setItemSelected(item);
        setVisible(true);
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={4}>
                    <Affix offsetTop={24} onChange={affixed => console.log(affixed)}>
                        <div className={styles['driver-container']}>
                            {
                                drivers && drivers.map((item, key) => {
                                    const is_selected = item.id === selected;
                                    const text_style = styles[`driver-item-text-${is_selected ? 'selected' : 'unselected'}`];
                                    return (
                                        <div className={classnames(
                                            styles['driver-item'],
                                            styles[`driver-item-${is_selected ? 'selected' : 'unselected'}`],
                                            'flex-row')}
                                            key={key}
                                            onClick={() => { handleChangeDriver(item) }}>
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
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView='month'
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

export default Schedule;