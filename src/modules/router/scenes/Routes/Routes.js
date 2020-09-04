import React, { useReducer } from 'react';
//antd
import { Row, Col, Button, Input, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
//lib
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
//hook
import useTable from './useTable';
import { initial_state, reducer_state } from './routeState';

const { Search } = Input;
const Routes = () => {
    const { columns, onRow } = useTable();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const { data_source } = state;

    const history = useHistory();

    const goToCreateRoute = () => {
        history.push('/route/create')
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Search placeholder='Tìm kiếm...' />
                </Col>
                <Col offset={6} span={12} className={classnames('flex-row', 'justify-end')}>
                    <Button type='primary' icon={<PlusCircleOutlined />} onClick={goToCreateRoute}>
                        {"Tạo định tuyến"}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={data_source} onRow={onRow} />
                </Col>
            </Row>
        </div>
    )
}

export default Routes;