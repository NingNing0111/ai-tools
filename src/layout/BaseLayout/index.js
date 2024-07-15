import { Layout } from "antd";
import MySider from "../../component/Sider";
import { Outlet } from "react-router-dom";
import { menuRouterList } from "../../router/config";
const BaseLayout = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <MySider collapsed={false} menuItems={menuRouterList} />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
