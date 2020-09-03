import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';

//lib
import { useHistory, useRouteMatch } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
//components
import Footer from '../../components/Footer';
//styles
import styles from "./styles.module.scss";

const { Header, Content } = Layout;
const { SubMenu } = Menu;

const BasicLayout = (props) => {
    const { children } = props;
    const [selected_keys, setSelectedKeys] = useState('/')

    const history = useHistory();
    const match = useRouteMatch();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        let { path } = match;
        let arr = path.split("/").filter((e) => e !== "");
        if (!isEmpty(arr)) {
            setSelectedKeys(arr[0]);
        }
    }, [])

    const onPushRoute = (url) => {
        let arr = url.split("/").filter((e) => e !== "");
        if (!isEmpty(arr)) {
            setSelectedKeys(arr[0]);
        }
        history.push(url);
    }

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={selected_keys} >
                    <Menu.Item key="dashboard" icon={<PieChartOutlined />} onClick={() => onPushRoute('/dashboard')}>
                        {"Trang chủ"}
                    </Menu.Item>
                    <Menu.Item key="warehouses" icon={<PieChartOutlined />} onClick={() => onPushRoute('/warehouses')}>
                        {"Định tuyến"}
                    </Menu.Item>
                    <Menu.Item key="taixe" icon={<PieChartOutlined />} onClick={() => onPushRoute('/taixe')}>
                        {"Tài xế"}
                    </Menu.Item>
                    <Menu.Item key="doixe" icon={<DesktopOutlined />} onClick={() => onPushRoute('/doixe')}>
                        {"Đội xe"}
                    </Menu.Item>
                    <Menu.Item key="hanghoa" icon={<DesktopOutlined />} onClick={() => onPushRoute('/hanghoa')}>
                        {"Hàng hóa"}
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Phân tuyến"
                        className={styles.navleft_menu_sub}
                    >
                        <Menu.Item key="phantuyen/danhsach" onClick={() => onPushRoute('/phantuyen/danhsach')}>{"Danh sách tuyến"}</Menu.Item>
                        <Menu.Item key="phantuyen/create" onClick={() => onPushRoute('/phantuyen/create')}>{"Tạo định tuyến"}</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
            <Content style={{ padding: '88px 24px 24px 24px' }}>
                {children}
            </Content>
            <Footer />
        </Layout>
    );
}

export default BasicLayout;