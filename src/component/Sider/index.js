import { Layout, Menu, Row, Col } from "antd";
import { GithubOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.css";
import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import CommonInfo from "../../common";

const MySider = ({ menuItems, collapsed }) => {
  const { Sider } = Layout;

  const topMenuItems = [];
  const bottomMenuItems = [];
  const navigate = useNavigate();

  for (var i in menuItems) {
    const item = menuItems[i];
    var menuType = item.meta.menuType;
    const obj = {
      key: item.path ?? item.meta.path,
      icon: item.meta.icon,
      label: item.meta.name,
    };
    if (menuType === "top") {
      topMenuItems.push(obj);
    }
    if (menuType === "bottom") {
      bottomMenuItems.push(obj);
    }
  }

  const [selectedIndex, setSelectedIndex] = useState(["/"]);

  const handleSelect = (e) => {
    const path = e.key;
    if (path === "setting") {
      setSelectedIndex([""]);
    } else if (path === "github") {
      setSelectedIndex(["/"]);
    } else {
      setSelectedIndex([path]);
    }
    if (path === "github") {
      window.open(CommonInfo.GITHUB_AUTHOR);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="my-sider-box">
      <Sider
        className="my-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Row
          justify={"space-between"}
          className="menu-top-item"
          onClick={() => handleSelect({ key: "github" })}
        >
          <GithubOutlined className="menu-top-icon" />
          <h2 style={{ color: "#fff" }}>GitHub</h2>
        </Row>
        <Menu
          className="menu-top"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={selectedIndex}
          items={topMenuItems}
          onClick={handleSelect}
        />

        <Row
          justify={"center"}
          className={classNames("bottom-setting-box", {
            "is-blue": selectedIndex[0] === "",
          })}
          align={"middle"}
          onClick={() => handleSelect({ key: "setting" })}
        >
          <Col span={4}>
            <SettingOutlined />
          </Col>
          <Col span={9}>
            <span>设置中心</span>
          </Col>
        </Row>
      </Sider>
    </div>
  );
};

export default MySider;
