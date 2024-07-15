import { Layout, Button } from "antd";
import { useState } from "react";
import MySider from "../../component/Sider";
import { Outlet } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { menuRouterList } from "../../router/config";
const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Header } = Layout;
  return (
    <Layout>
      <MySider collapsed={collapsed} menuItems={menuRouterList} />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
