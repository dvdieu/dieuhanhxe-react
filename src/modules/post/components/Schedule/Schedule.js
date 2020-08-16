import React from 'react';

import { Steps, Button, } from 'antd';
//styles
import styles from './styles.module.scss';

const { Step } = Steps;

const Schedule = ({ data, id, position, changePosition }) => {
    // const onOpenNewTab = () => {
    //     window.open('http://localhost:3000/phantuyen/chitiethanghoa/0', "_blank")
    // }

    const onChangePosition = id => {
        changePosition(id);
    }

    const dulieu = data[id]?.steps || [];

    return (
        <div>
            <div className={styles.schedule}>
                <Steps
                    progressDot
                    current={dulieu.length} direction="vertical">
                    {
                        dulieu.map(item => {
                            return (
                                < Step
                                    key={item.key}
                                    title={item.title}
                                    description={item.description}
                                    subTitle={<Button type={`${item.id === position ? 'primary' : 'default'} `} onClick={() => { onChangePosition(item.id) }}>Xem chi tiết</Button >} ></Step>
                            )
                        })
                    }
                </Steps >
            </div >

        </div>
    )
}

export default Schedule;