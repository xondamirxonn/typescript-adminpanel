import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Tooltip, Modal, message } from "antd";
import { Link, Outlet } from "react-router-dom";
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

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to log out?",
      icon: <QuestionCircleOutlined />,
      onOk() {
        Cookies.remove("user-token");
        window.location.replace("/login");
      },
      onCancel() {
        message.info("The output has been cancelled");
      },
    });
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "12px",
            }}
          >
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
            <Tooltip title="Log Out" placement="left">
              <LogoutOutlined
                onClick={showConfirm}
                style={{
                  fontSize: "20px",
                  marginRight: "30px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </div>
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
