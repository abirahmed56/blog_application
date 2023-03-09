import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CreditCardOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined
  } from "@ant-design/icons";
  import { Layout, Menu } from "antd";
  import React, { useState } from "react";
  import Blogs from "../../components/blogs";
  import { CreateBlogs } from "../../components/blogs/CreateBlogs";


export default function home() {
  const { Header, Sider } = Layout;

    const [collapsed, setCollapsed] = useState(false);

    
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: "Home",
              },
              {
                key: "2",
                icon: <ProfileOutlined/>,
                label: "Profile",
              },
              {
                key: "3",
                icon: <CreditCardOutlined/>,
                label: "Create Post",
              },
              {
                key: "4",
                icon: <LogoutOutlined/>,
                label: "Log out",
              },
  
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          {/* <CreateBlogs /> */}

          <Blogs />
        </Layout>
        
      </Layout>
      

    );
  }