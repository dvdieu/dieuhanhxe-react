import React, { memo } from 'react';


import { Steps } from 'antd';
//styles

const { Step } = Steps;


const CustomStep = ({ order_address }) => {
    return (
        <Steps
            progressDot
            current={order_address.length} direction="vertical">
            {
                order_address.map(item => {
                    return (
                        < Step
                            key={item._id}
                            title={item.address} >
                        </Step>
                    )
                })
            }
        </Steps >
    )
}

export default memo(CustomStep)