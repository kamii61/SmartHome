import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import '../../../node_modules/antd/dist/antd.min.css';
import './Admin.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function Admin(props) {
  const { Component, path } = props;
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed({ collapsed: !collapsed });
  };
  return (
    <Route
      path={path}
      exact
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              onCollapse={onCollapse}
            >
              <div className='logo' />
              <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                <Menu.Item key='1' icon={<UserOutlined />}>
                  <NavLink to='/admin/client'>Clients</NavLink>
                </Menu.Item>
                <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                  <NavLink to='/admin/room'>Rooms</NavLink>
                </Menu.Item>
                <Menu.Item key='3' icon={<UploadOutlined />}>
                  <NavLink to='/admin/item'>Items</NavLink>
                </Menu.Item>
                <SubMenu key='chart' icon={<PieChartOutlined />} title='Chart'>
                  <Menu.Item key='4'>
                    <NavLink to='/admin/chart/temp'>Temp</NavLink>
                  </Menu.Item>
                  <Menu.Item key='5'>
                    <NavLink to='/admin/chart/hum'>Hum</NavLink>
                  </Menu.Item>
                  <Menu.Item key='6'>
                    <NavLink to='/admin/chart/gas'>Gas</NavLink>
                  </Menu.Item>
                  <Menu.Item key='7'>
                    <NavLink to='/admin/chart/pir'>PIR</NavLink>
                  </Menu.Item>
                  <Menu.Item key='8'>
                    <NavLink to='/admin/chart/ldr'>LDR</NavLink>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key='9' icon={<VideoCameraOutlined />}>
                  <NavLink to='/admin/camera'>Camera</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className='site-layout'>
              <Header className='site-layout-background' style={{ padding: 0 }}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: onCollapse,
                  }
                )}
              </Header>
              <Content
                className='site-layout-background'
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}
