import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

//lib
import classNames from "classnames";
import { useHistory } from "react-router-dom";

//styles
import styles from "./styles.module.scss";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout = (props) => {
    const { children } = props;
    const [collapsed, setCollapsed] = useState(false);

    const history = useHistory();

    const onCollapse = () => {
        setCollapsed(!collapsed)
    };

    const onPushRoute = (url) => {
        history.push(url);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ backgroundColor: '#2A3F54' }}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    className={classNames({
                        [styles["navleft_menu"]]: true,
                        [styles["navleft_menu--collapse"]]: collapsed,
                    })}>
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => onPushRoute('/taixe')}>
                        {"Tài xế"}
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => onPushRoute('/doixe')}>
                        {"Đội xe"}
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => onPushRoute('/hanghoa')}>
                        {"Hàng hóa"}
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => onPushRoute('/diemden')}>
                        {"Điểm đến"}
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Phân tuyến"
                        className={styles.navleft_menu_sub}
                    >
                        <Menu.Item key="5" onClick={() => onPushRoute('/danhsachtuyen')}>{"Danh sách tuyến xe"}</Menu.Item>
                        <Menu.Item key="6" onClick={() => onPushRoute('/taotuyen')}>{"Tạo định tuyến"}</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: '0 8px', backgroundColor: '#EDEDED' }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: onCollapse,
                    })}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 Created by FLICK</Footer>
            </Layout>
        </Layout>
    );
}

export default BasicLayout;