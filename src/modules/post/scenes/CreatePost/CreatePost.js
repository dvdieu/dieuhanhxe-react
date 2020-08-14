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
//lib
import Immutable from "seamless-immutable";
//redux
import { useSelector, useDispatch } from "react-redux";
//action
import PostActions from '../../reducer/actions';

const { Step } = Steps;

/* #region  generator data orders */
const order_data = [];

const _DIADIEM = [
    '10 ĐƯỜNG TRẦN XUÂN SOẠN PHƯỜNG PHẠM ĐÌNH HỒ QUẬN HAI BÀ TRƯNG TP HÀ NỘI',
    'KTX ĐH kinh tế quốc dân, phường đồng tâm, quận hai bà trưng, thành phố hà nội',
    'Số 26 Tổ 9 Phố Cầu Bây, Phường Sài Đồng, Quận Long Biên, Tp Hà Nội',
    'Đức Lan 91 Thanh Nhàn phường Quỳnh Mai quận Hai Bà Trưng thành phố Hà Nội',
    '152 phố vọng, phường phương liệt, quận thanh xuân, thành phố hà nội',
]

const _TONGTRONGLUONG = [800, 600, 400, 200, 500];
const _TONGKICHTHUONG = [4, 7, 6, 1, 2];

for (let i = 0; i < 5; i++) {
    order_data.push({
        key: i,
        ma_order: `121000040` + i,
        ten_dia_diem: _DIADIEM[i],
        tinh_trang: `Chưa phân tuyến`,
        tong_trong_luong: _TONGTRONGLUONG[i],
        tong_kich_thuoc: _TONGKICHTHUONG[i],
    });
}
/* #endregion */

const CreatePost = () => {
    const post_reducer = useSelector(state => state.post_reducer);
    const post = Immutable.asMutable(post_reducer, { deep: true });
    const { step } = post;
    //hook
    const dispatch = useDispatch();

    const onStepBack = () => {
        dispatch(PostActions.setStep({
            step: step - 1
        }));
    }

    const onStepNext = () => {
        dispatch(PostActions.setStep({
            step: step + 1
        }));
    }

    const onSubmit = () => {
        dispatch(PostActions.setStep({
            step: 0
        }));
    }

    /* #region  đơn hàng */
    const [selectedOrderRowKeys, setSelectedOrderRowKeys] = useState([]);
    const [tong_trong_luong, setTongTrongLuong] = useState(0);
    const [tong_kich_thuoc, setTongKichThuoc] = useState(0);

    const onSelectOrderChange = selectedRowKeys => {
        let trong_luong = 0;
        let kich_thuoc = 0;
        selectedRowKeys.forEach(element => {
            trong_luong += order_data[element].tong_trong_luong;
            kich_thuoc += order_data[element].tong_kich_thuoc;
        });
        setTongTrongLuong(trong_luong);
        setTongKichThuoc(kich_thuoc);
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
                        <Step title="Thiết lập điểm đến" />
                        <Step title="Tối ưu đường đi" />
                        <Step title="Giao cho đội xe" />
                    </Steps>
                </Col>
            </Row>
            {
                step === 0 && <Orders rowSelection={rowOrderSelection} data={order_data} />
            }
            {
                step === 1 && <Confirm rowSelection={rowTruckSelection} tong_kich_thuoc={tong_kich_thuoc} tong_trong_luong={tong_trong_luong} />
            }
            {
                step === 2 && <Trucks rowSelection={rowTruckSelection} />
            }
            <Portal id="root_footer">
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        step > 0 &&
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