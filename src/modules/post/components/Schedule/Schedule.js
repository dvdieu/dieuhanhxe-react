import React from 'react';

import { Steps } from 'antd';
//styles
import styles from './styles.module.scss';

const { Step } = Steps;

const data = [];
for (let i = 0; i < 30; i++) {
    data.push({
        key: i,
        title: `Cửa hàng : VINMART : 36 Hoàng Cầu Đống Đa - Hà Nội` + i,
        description: 'Kiện hàng số - 01 - 02 - 03',


    });
}

const Schedule = () => {
    return (
        <div className={styles.schedule}>
            <Steps
                progressDot
                current={data.length} direction="vertical">
                {
                    data.map(item => {
                        return (
                            < Step
                                title={item.title}
                                description={item.description}
                                subTitle={< button >Xem chi tiết</button >} ></Step>
                        )
                    })
                }
            </Steps >
        </div >
    )
}

export default Schedule;