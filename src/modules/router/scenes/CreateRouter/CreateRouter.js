import React, { useReducer, useState, useEffect } from 'react';
//page
import Warehouses from '../Warehouses';
import SetupWarehouse from '../SetupWarehouse';
import HintRouter from '../HintRouter';
import Schedule from '../Schedule';
//components
import Portal from '../../../../components/Portal';
//lib
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { useHistory } from 'react-router-dom';
import { Prompt } from 'react-router-dom';
//antd
import { Button, Spin } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
//hook
import { initial_state, reducer_state } from './routerState';
import useHandleWarehouses from './useHandleWarehouses';
import useHandleSetupWarehouse from './useHandleSetupWarehouse';
import useHandleHintRouter from './useHandleHintRouter';
import useHandleSchedule from './useHandleSchedule';
//redux
import { useDispatch } from 'react-redux';
//actions
import actions from './actions';
import routeActions from '../../reducer/actions';

const CreateRouter = () => {
    const [count, setCount] = useState(0);
    //hook
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const [spin, setSpin] = useState(false);
    const {
        step,
        //step 0
        warehouse,
        //step 1
        priority_warehouse,
        priority_truck,
        selected_order,
        selected_order_keys,
        //hint
        direction_request,
        direction_templates,
        current_direction,
        waypoints,
        order_address,
        orders,
        //schedule
        trucks,
        find_trucks,
        direction_name,
        new_event,
        truck,
    } = state;
    const { handleChangeWarehouse } = useHandleWarehouses({ dispatchState });
    const { onChangePriorityTruck, onChangePriorityWarehouse, onChangeSelectedOrder } = useHandleSetupWarehouse({ dispatchState })
    const { createDirectionTemplate, handleChangeCurrentDirection, handleRemoveOrder, handleAddOrder } = useHandleHintRouter({
        warehouse,
        priority_warehouse,
        priority_truck,
        selected_order,
        direction_templates,
        //
        dispatchState
    });
    const { selectTruck, handleChangeNewEvent, handleChangeTruck } = useHandleSchedule({ priority_truck, dispatchState });

    const dispatch = useDispatch();
    const history = useHistory();

    const onStepBack = () => {
        dispatchState({
            type: actions.SET_STEP,
            step: step - 1
        })
    }

    const onStepNext = () => {
        dispatchState({
            type: actions.SET_STEP,
            step: step + 1
        })
    }

    const onSubmit = () => {
        let directs = direction_templates.filter(item => item.confirm)
        const params = { directs };
        dispatch(routeActions.createDirectionRequest(params));
        //note để tạm
        setSpin(true);
        setTimeout(() => {
            setSpin(false)
            history.push('/routes')
        }, 2000)
    }

    useEffect(() => {
        let directs = direction_templates.filter(item => item.confirm);
        setCount(directs.length);
    }, [direction_templates])

    const isDisableNext = () => {
        if (step === 0) {
            return warehouse.warehouse_id === 0;
        } else if (step === 1) {
            return selected_order.length === 0;
        }
        return false;
    }

    const handleAddTruckToDirect = () => {
        let direct = {
            ...current_direction,
            start_date: (new Date(new_event.start).getTime()),
            end_date: (new Date(new_event.end).getTime()),
            number_order: current_direction.orders.length,
            truck,
            confirm: true
        }
        let directions = cloneDeep(direction_templates);
        const index = directions.findIndex(item => item._id === direct._id);
        if (index > -1) {
            directions[index] = direct;
            dispatchState({
                type: actions.SET_DIRECTION_TEMPLATES,
                direction_templates: directions
            })
            //cap nhat tuyen hien tai
            dispatchState({
                type: actions.SET_CURRENT_DIRECTION,
                current_direction: {
                    ...current_direction,
                    truck
                }
            })
        }
        onStepBack();
        dispatchState({
            type: actions.SET_TRUCK,
            truck: {}
        })
    }

    return (
        <>
            <Prompt
                when={false}
                message='Dữ liệu chưa được lưu, bạn chắc chắn muốn thoát?'
            />
            <Spin
                spinning={spin}
                tip={"Đang xử lý"}
                delay={500}
            >
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
                            warehouse={warehouse}
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
                            warehouse={warehouse}
                            origin={{
                                latitude: warehouse.latitude,
                                longitude: warehouse.longitude
                            }}
                            selected_order={selected_order}
                            direction_request={direction_request}
                            direction_templates={direction_templates}
                            current_direction={current_direction}
                            waypoints={waypoints}
                            order_address={order_address}
                            orders={orders}
                            selectTruck={selectTruck}
                            handleChangeCurrentDirection={handleChangeCurrentDirection}
                            handleRemoveOrder={handleRemoveOrder}
                            handleAddOrder={handleAddOrder} />
                    }
                    {
                        step === 3 &&
                        <Schedule
                            trucks={trucks}
                            find_trucks={find_trucks}
                            direction_name={direction_name}
                            current_direction={current_direction}
                            new_event={new_event}
                            truck={truck}
                            handleChangeNewEvent={handleChangeNewEvent}
                            handleChangeTruck={handleChangeTruck} />
                    }
                    <Portal id='root_footer'>
                        <div className={classnames('flex-row', 'justify-end')} style={{ padding: '12px 0px' }}>
                            {
                                step > 0 &&
                                <Button size='large' onClick={onStepBack} icon={<ArrowLeftOutlined />}>{"Trở lại"}</Button>
                            }
                            {
                                step === 0 &&
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
                                step === 1 &&
                                <Button
                                    type="primary"
                                    onClick={createDirectionTemplate}
                                    size='large'
                                    style={{ marginLeft: 12 }}
                                    disabled={isDisableNext()}>
                                    {"Tiếp theo"}
                                    <ArrowRightOutlined />
                                </Button>
                            }
                            {
                                (step === 2) ?
                                    count > 0 ?
                                        <Button type="primary" onClick={onSubmit} size='large' style={{ marginLeft: 12 }}>
                                            {`Xác nhận ${count} lịch trình`}
                                            <CheckCircleOutlined />
                                        </Button> :
                                        <Button type="primary" disabled={true} size='large' style={{ marginLeft: 12 }}>
                                            {"Xác nhận lịch trình"}
                                            <CheckCircleOutlined />
                                        </Button>
                                    : <></>
                            }
                            {
                                step === 3 &&
                                <Button type="primary"
                                    disabled={isEmpty(new_event) || isEmpty(truck)}
                                    onClick={handleAddTruckToDirect} size='large' style={{ marginLeft: 12 }}>
                                    {"Xác nhận lịch trình"}
                                    <CheckCircleOutlined />
                                </Button>
                            }
                        </div>
                    </Portal>
                </div>
            </Spin>
        </>
    )
}

export default CreateRouter;