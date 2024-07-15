import BaseLayout from "../layout/BaseLayout";
import Imitate from "../page/Imitate";
import Json2Obj from "../page/Json2Obj";
import Setting from "../page/Setting";
import {
  DeploymentUnitOutlined,
  VideoCameraOutlined,
  SettingFilled,
} from "@ant-design/icons";

const routerList = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Imitate />,
        meta: {
          menuType: "top",
          name: "AI模仿",
          path: "/",
          icon: <DeploymentUnitOutlined />,
        },
      },
      {
        path: "json-2-language-obj",
        element: <Json2Obj />,
        meta: {
          menuType: "top",
          name: "Json转对象",
          icon: <VideoCameraOutlined />,
        },
      },
      {
        path: "setting",
        element: <Setting />,
        meta: {
          menuType: "bottom",
          name: "设置中心",
          icon: <SettingFilled />,
        },
      },
    ],
  },
];

const menuRouterList = routerList[0].children;
export { menuRouterList };
export default routerList;
