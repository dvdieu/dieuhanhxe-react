import React from 'react';

//layout
import BasicLayout from '../../layouts/BasicLayout';

//components
import { Button } from 'antd';

//styles
import styles from './styles.module.scss';

const ErrorPage = (props) => {

    //handle
    const onClickButton = () => {
        props.history.push('/');
    }
    return (
        <div className={styles['error-page']}>
            <div className={styles['error-page-image']} />
            <div className={styles['error-page-title']}>Không tìm thấy</div>
            <div className={styles['error-page-content']}>Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Quay về trang chủ để tìm thêm thông tin bạn nhé! </div>
            <Button size='large' type="primary" onClick={onClickButton}>Về trang chủ</Button>
        </div>
    )
}

ErrorPage.Layout = BasicLayout;
ErrorPage.Title = false;

export default ErrorPage;