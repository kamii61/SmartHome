import React, { useState } from "react";
import "./Admin.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import "../../../node_modules/antd/dist/antd.min.css";

const { Header, Sider, Content } = Layout;

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
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <NavLink to="/admin/client">Clients</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <NavLink to="/admin/room">Rooms</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  <NavLink to="/admin/item">Items</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: onCollapse,
                  }
                )}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
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
