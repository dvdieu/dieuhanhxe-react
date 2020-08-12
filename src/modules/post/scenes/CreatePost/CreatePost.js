import React, { useState } from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//antd
import { Steps, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
//components
import Portal from '../../../../components/Portal';
import Orders from '../../components/Orders';
import Trucks from '../../components/Trucks';
import Confirm from '../../components/Confirm';
//styles
import styles from './styles.module.scss';

const { Step } = Steps;
const CreatePost = () => {
    const [step, setStep] = useState(0);

    const onStepBack = () => {
        setStep(step - 1);
    }

    const onStepNext = () => {
        setStep(step + 1);
    }

    const onSubmit = () => {

    }

    /* #region  đơn hàng */
    const [selectedOrderRowKeys, setSelectedOrderRowKeys] = useState([])

    const onSelectOrderChange = selectedRowKeys => {
        setSelectedOrderRowKeys(selectedRowKeys);
    };

    const rowOrderSelection = {
        selectedRowKeys: selectedOrderRowKeys,
        onChange: onSelectOrderChange,
    };
    /* #endregion */

    /* #region  xe tải */
    const [selectedTruckRowKeys, setSelectedTruckRowKeys] = useState([])

    const onSelectTruckChange = selectedRowKeys => {
        setSelectedTruckRowKeys(selectedRowKeys);
    };

    const rowTruckSelection = {
        selectedRowKeys: selectedTruckRowKeys,
        onChange: onSelectTruckChange,
    };
    /* #endregion */

    return (
        <div>
            <Row>
                <Col xs={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <Steps size="small" current={step} className={styles.steps}>
                        <Step title="Chọn đơn hàng" />
                        <Step title="Chọn xe" />
                        <Step title="Xác nhận" />
                    </Steps>
                </Col>
            </Row>
            {
                step === 0 && <Orders rowSelection={rowOrderSelection} />
            }
            {
                step === 1 && <Trucks rowSelection={rowTruckSelection} />
            }
            {
                step === 2 && <Confirm rowSelection={rowTruckSelection} />
            }
            <Portal id="root_footer">
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        step === 1 &&
                        <Button size='large' onClick={onStepBack} icon={<ArrowLeftOutlined />}>{"Trở lại"}</Button>
                    }
                    {
                        step <= 1 &&
                        <Button type="primary" onClick={onStepNext} size='large' style={{ marginLeft: 12 }}>
                            {"Tiếp theo"}
                            <ArrowRightOutlined />
                        </Button>
                    }
                    {
                        step === 2 &&
                        <Button type="primary" onClick={onSubmit} size='large' style={{ marginLeft: 12 }}>
                            {"Xác nhận lịch trình"}
                            <CheckCircleOutlined />
                        </Button>
                    }
                </div>
            </Portal>
        </div>
    )
}

CreatePost.Layout = BasicLayout;

export default CreatePost;