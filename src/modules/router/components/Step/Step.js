import React, { memo } from 'react';


import { Steps } from 'antd';
//styles

const { Step } = Steps;

const data = [
    {
        id: 1,
        address: 'Kho 1 - 05 Hàng Buồm'
    },
    {
        id: 2,
        address: '10 Trần Xuân Soạn, Hai Bà Trưng, Hà Nội'
    },
    {
        id: 3,
        address: 'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Tp Hà Nội'
    },
    {
        id: 4,
        address: 'Đức Lan 91 Thanh Nhàn phường Quỳnh Mai quận Hai Bà Trưng thành phố Hà Nội'
    },
    {
        id: 5,
        address: '152 phố vọng, phường phương liệt, quận thanh xuân, thành phố hà nội'
    }
]

const CustomStep = () => {
    return (
        <Steps
            progressDot
            current={data.length} direction="vertical">
            {
                data.map(item => {
                    return (
                        < Step
                            key={item.id}
                            title={item.address} >
                        </Step>
                    )
                })
            }
        </Steps >
    )
}

export default memo(CustomStep)