import React, { useState, useReducer } from 'react';
//page
import Warehouses from '../Warehouses';
import SetupWarehouse from '../SetupWarehouse';
import HintRouter from '../HintRouter';
import Schedule from '../Schedule';
//components
import Portal from '../../../../components/Portal';
//lib
import classnames from 'classnames';
//antd
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
//hook
import { initial_state, reducer_state } from './routerState';
import useHandleWarehouses from './useHandleWarehouses';
import useHandleSetupWarehouse from './useHandleSetupWarehouse';

const CreateRouter = () => {
    const [step, setStep] = useState(0);
    //hook
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const {
        //step 0
        warehouse,
        //step 1
        priority_warehouse,
        priority_truck,
        selected_order,
        selected_order_keys,
    } = state;
    const { handleChangeWarehouse } = useHandleWarehouses({ dispatchState });
    const { onChangePriorityTruck, onChangePriorityWarehouse, onChangeSelectedOrder } = useHandleSetupWarehouse({ dispatchState })

    const onStepBack = () => {
        setStep(step - 1);
    }

    const onStepNext = () => {
        setStep(step + 1);
    }

    const onSubmit = () => {

    }

    const isDisableNext = () => {
        if (step === 0) {
            return warehouse.warehouse_id === 0;
        } else if (step === 1) {
            return selected_order.length === 0;
        }
        return false;
    }

    return (
        <div>
            {
                // danh sach kho
                step === 0 &&
                <Warehouses
                    warehouse_id={warehouse.warehouse_id}
                    handleChangeWarehouse={handleChangeWarehouse} />
            }
            {
                //thiết lập định tuyến
                step === 1 &&
                <SetupWarehouse
                    warehouse_name={warehouse.name}
                    priority_warehouse={priority_warehouse}
                    priority_truck={priority_truck}
                    selected_order_keys={selected_order_keys}
                    onChangePriorityTruck={onChangePriorityTruck}
                    onChangePriorityWarehouse={onChangePriorityWarehouse}
                    onChangeSelectedOrder={onChangeSelectedOrder}
                />
            }
            {
                step === 2 &&
                <HintRouter
                    selected_order={selected_order}
                    onConfirmRoute={() => setStep(3)} />
            }
            {
                step === 3 &&
                <Schedule onOk={() => setStep(2)} onClickPrevious={() => setStep(2)} />
            }
            <Portal id='root_footer'>
                <div className={classnames('flex-row', 'justify-end')} style={{ padding: '12px 0px' }}>
                    {
                        step > 0 &&
                        <Button size='large' onClick={onStepBack} icon={<ArrowLeftOutlined />}>{"Trở lại"}</Button>
                    }
                    {
                        step <= 1 &&
                        <Button
                            type="primary"
                            onClick={onStepNext}
                            size='large'
                            style={{ marginLeft: 12 }}
                            disabled={isDisableNext()}>
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
                     {
                        step === 3 &&
                        <Button type="primary" onClick={onStepBack} size='large' style={{ marginLeft: 12 }}>
                            {"Xác nhận lịch trình"}
                            <CheckCircleOutlined />
                        </Button>
                    }
                </div>
            </Portal>
        </div>
    )
}

export default CreateRouter;