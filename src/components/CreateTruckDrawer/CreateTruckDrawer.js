import React, {useReducer } from 'react';
//antd
import { Drawer, Button, Row, Col, Form, Input, Select, InputNumber, Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
//lib
import i18n from '../../libs/i18n';
import classnames from 'classnames';
//hook
import truckState from './truckState';
import useCommon from './useCommon';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;
const { Dragger } = Upload;

// id: 0
// license_plates: "29M1-55550"
// maker: "THACO"
// name: "THACO TOWNER 800"
// size: 5
// status: "waiting"
// type: "cold"
// warehouse: 1
// weight: 2.5

const CreateTruckDrawer = ({ visible, onClose, onSubmit }) => {
    const { init_state, reducer_state } = truckState;
    const [state, dispatchState] = useReducer(reducer_state, init_state);
    const {
        handleChangeLicense,
        handleChangeName,
        handleChangeMaker,
        handleChangeType,
        handleChangeWarehouse,
        handleChangeWeight,
        handleChangeSize,
    } = useCommon({ dispatchState });
    const { truck } = state;
    const { license_plates, name, maker, type, warehouse, weight, size } = truck;

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                // message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Drawer
            title="Tạo xe"
            width={620}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        {"Đóng"}
                    </Button>
                    <Button onClick={() => { onSubmit(truck) }} type="primary">{"Xác nhận"}  </Button>
                </div>
            }>
            <Form layout='vertical'>
                <Row gutter={16}>
                    <Col span={12}>
                        <Item
                            name='license_plates'
                            label='Biển số'
                            rules={[{ required: true, message: 'Vui lòng nhập biển số' }]}>
                            <Input
                                placeholder='Nhập biển số'
                                value={license_plates}
                                onChange={handleChangeLicense} />
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            name='name'
                            label='Tên xe'
                            rules={[{ required: false, message: '' }]}>
                            <Input
                                placeholder='Nhập tên xe'
                                value={name}
                                onChange={handleChangeName} />
                        </Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Item
                            name='maker'
                            label='Hãng xe'
                            rules={[{ required: true, message: 'Vui lòng chọn hãng xe' }]}>
                            <Select placeholder='Chọn hãng xe' value={maker} onChange={handleChangeMaker}>
                                <Option value='thaco'>{"Thaco"}</Option>
                                <Option value='hyundai'>{"Hyundai"}</Option>
                                <Option value='isuzu'>{"Isuzu"}</Option>
                                <Option value='suzuki'>{"Suzuki"}</Option>
                            </Select>
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            name='type'
                            label='Loại'
                            rules={[{ required: false, message: 'Vui lòng chọn loại xe' }]}>
                            <Select placeholder='Chọn loại xe' value={type} onChange={handleChangeType}>
                                <Option value='normal'>{i18n.t('normal')}</Option>
                                <Option value='cold'>{i18n.t('cold')}</Option>
                            </Select>
                        </Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Item
                            name='warehouse'
                            label='Kho'
                            rules={[{ required: true, message: 'Vui lòng chọn kho' }]}>
                            <Select placeholder='Chọn kho' value={warehouse} onChange={handleChangeWarehouse}>
                                <Option value='001'>{i18n.t('Kho 001')}</Option>
                                <Option value='002'>{i18n.t('Kho 002')}</Option>
                            </Select>
                        </Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Item
                            name='weight'
                            label='Trọng tải'
                            rules={[{ required: true, message: 'Vui lòng nhập trọng tải' }]}>
                            <div className={classnames('flex-row', 'align-bottom')}>
                                <InputNumber style={{ width: '100%', marginRight: 8 }} min={0.1} step={0.1} value={weight} onChange={handleChangeWeight} />
                                <Text>{"Tấn"}</Text>
                            </div>
                        </Item>
                    </Col>
                    <Col span={12}>
                        <Item
                            name='size'
                            label='Kích thước'
                            rules={[{ required: true, message: 'Vui lòng nhập kích thước' }]}>
                            <div className={classnames('flex-row', 'align-bottom')}>
                                <InputNumber style={{ width: '100%', marginRight: 8 }} min={0.1} step={0.1} value={size} onChange={handleChangeSize} />
                                <Text>{"Khối"}</Text>
                            </div>
                        </Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                            {/* <p className="ant-upload-text">{"Bấm hoặc kéo file vào vùng này để tải lên"}</p> */}
                            <p className="ant-upload-hint">{"Bấm hoặc kéo file vào vùng này để tải lên"}</p>
                        </Dragger>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}

export default React.memo(CreateTruckDrawer);