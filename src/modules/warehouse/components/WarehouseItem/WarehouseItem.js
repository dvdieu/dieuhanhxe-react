import React, { memo } from 'react';
//antd
import { Col, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
//styles
import styles from './styles.module.scss';
//lib
import classnames from 'classnames';

const { Text } = Typography;

const WarehouseItem = ({ warehouse, selected, onChangeWarehouse }) => {
    return (
        <Col span={6} className={classnames('flex-column', 'align-middle', 'pointer')} onClick={() => onChangeWarehouse(warehouse.id)}>
            <HomeOutlined className={classnames({
                [styles['warehouse-icon']]: true,
                [styles['selected']]: selected,
                [styles['unselected']]: !selected
            })} />
            <Text className={classnames({
                [styles['selected']]: selected,
                [styles['unselected']]: !selected
            })}>{warehouse.name}</Text>
        </Col>
    )
}

export default memo(WarehouseItem);