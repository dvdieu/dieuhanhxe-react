import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DingdingOutlined
} from '@ant-design/icons';

//lib
import classNames from "classnames";
import { useHistory } from "react-router-dom";

//components
import Footer from '../../components/Footer';
//styles
import styles from "./styles.module.scss";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

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
                <div onClick={() => onPushRoute('/')} style={{ padding: collapsed ? '16px 24px' : '16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <DingdingOutlined style={{ fontSize: 30, color: '#fff', marginRight: 8 }} />
                    {
                        !collapsed &&
                        <Text style={{ color: '#fff', fontSize: 22, }} >{'Flick'}</Text>
                    }
                </div>
                {
                    !collapsed &&
                    <div style={{ padding: 'bnâ', display: 'flex' }}>
                        <Avatar size={64} src={require('../../assets/images/avatar.png')} />
                        <div style={{ marginLeft: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        </div>
                    </div>
                }
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
                    className={classNames({
                        [styles["navleft_menu"]]: true,
                        [styles["navleft_menu--collapse"]]: collapsed,
                    })}>
                    <Menu.Item key="0" icon={<PieChartOutlined />} onClick={() => onPushRoute('/dashboard')}>
                        {"Dashboard"}
                    </Menu.Item>
                    <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => onPushRoute('/taixe')}>
                        {"Tài xế"}
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => onPushRoute('/doixe')}>
                        {"Đội xe"}
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => onPushRoute('/hanghoa')}>
                        {"Hàng hóa"}
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Phân tuyến"
                        className={styles.navleft_menu_sub}
                    >
                        <Menu.Item key="4" onClick={() => onPushRoute('/phantuyen/danhsach')}>{"Danh sách tuyến"}</Menu.Item>
                        <Menu.Item key="5" onClick={() => onPushRoute('/phantuyen/create')}>{"Tạo định tuyến"}</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: '0 8px', backgroundColor: '#fff' }}>
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
                    <div className="site-layout-background" style={{ padding: '24px 24px 56px 24px', minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>©2020 Created by FLICK</Footer> */}
                <Footer collapse={collapsed} />
            </Layout>
        </Layout>
    );
}

export default BasicLayout;