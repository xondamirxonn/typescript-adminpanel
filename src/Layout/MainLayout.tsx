import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet} from "react-router-dom";
import Cookies from "js-cookie";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const token = Cookies.get("user-token");
  if (!token) {
    window.location.replace("/login");
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarChartOutlined />,
              label: <Link to={"/"}>Dashboard</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to={"/category"}>Category</Link>,
            },
            {
              key: "3",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/sub-category"}>Sub Category</Link>,
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: <Link to={"/brand"}>Brand</Link>,
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: <Link to={"/attribute"}>Attribute</Link>,
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: <Link to={"/product"}>Product</Link>,
            },
            {
              key: "7",
              icon: <UploadOutlined />,
              label: <Link to={"/banner"}>Banner</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 32,
              height: 32,
              marginLeft: "1rem",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "83vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
