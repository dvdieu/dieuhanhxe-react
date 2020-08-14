import React from 'react';

import { Steps, Button } from 'antd';
//styles
import styles from './styles.module.scss';

const { Step } = Steps;


const Schedule = ({ data, id }) => {
    const onOpenNewTab = () => {
        window.open('http://localhost:3000/phantuyen/chitiethanghoa', "_blank")
    }

    const dulieu = data[id]?.steps || [];

    return (
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
                                subTitle={<Button onClick={onOpenNewTab}>Xem chi tiết</Button >} ></Step>
                        )
                    })
                }
            </Steps >
        </div >
    )
}

export default Schedule;