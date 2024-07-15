import { streamChat } from "../../api/openai.js";

import { Button, Row, Col, Input, Table, Space, Tooltip, message } from "antd";
import "./index.css";
import { CopyFilled, PlusCircleFilled, BulbOutlined } from "@ant-design/icons";
import { useState } from "react";
import Detail from "./Detail";
import { showConfirm } from "../../util/base.js";
import AddModal from "./AddModal.js";
import {
  getImitateSystemPrompt,
  getImitateUserPrompt,
} from "../../template/imitate.js";

const Imitate = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { TextArea } = Input;
  const { Column } = Table;

  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      language: "JavaScript",
      origin: "model.id = data.id",
      target: "model.id = JSON.parse(data.id)",
      description: "示例",
    },
  ]);

  const [detailItem, setDetailItem] = useState({
    description: "",
    language: "",
    origin: "",
    target: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [userOrigin, setUserOrigin] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const handleDetail = (e, record) => {
    setDetailItem(record);
    setModalOpen(true);
  };

  const handleDel = (e, record) => {
    const delItem = () => {
      setDataSource((prevDataSource) => {
        return prevDataSource.filter((item) => item.key !== record.key);
      });

      messageApi.open({
        type: "success",
        content: "删除成功",
      });
    };
    showConfirm(
      "删除警告",
      "确定要删除这个选项吗？",
      () => delItem(),
      () => {
        messageApi.open({
          type: "warning",
          content: "已取消",
        });
      }
    );
  };

  const getSubmitData = (dataObj) => {
    setDataSource((prevDataSource) => {
      return [
        ...prevDataSource,
        {
          key: dataSource.length + 1,
          language: dataObj.language,
          origin: dataObj.origin,
          target: dataObj.target,
          description: dataObj.description,
        },
      ];
    });
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const generateCode = async () => {
    setAiText("");
    // 系统提示词
    const systemPrompt = getImitateSystemPrompt();
    const userPrompt = getImitateUserPrompt(
      JSON.stringify(dataSource),
      userOrigin,
      userDescription,
      dataSource[0].language
    );
    var tmp = "";
    await streamChat(
      "gpt-3.5-turbo",
      [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      (content) => {
        tmp = tmp + content;
        setAiText(tmp);
      }
    );
  };

  return (
    <div className="imitate">
      {contextHolder}
      <Row justify={"space-between"} className="input-box">
        <Col span={14}>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder="输入旧代码"
            value={userOrigin}
            onChange={(e) => setUserOrigin(e.target.value)}
          />
        </Col>

        <Col span={8}>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder="输入描述"
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          />
        </Col>
      </Row>
      <Row justify={"end"}>
        <Col span={3}>
          <Button type="dashed" icon={<PlusCircleFilled />} onClick={handleAdd}>
            添加示例
          </Button>
        </Col>

        <Col span={3}>
          <Button type="primary" icon={<CopyFilled />}>
            一键复制
          </Button>
        </Col>
      </Row>
      <Row className="imitate-main">
        <Table dataSource={dataSource}>
          <Column
            title="序号"
            dataIndex="key"
            key="index"
            render={(text, record, index) => index + 1}
          />
          <Column title="语言" dataIndex="language" key="language" />
          <Column
            ellipsis
            title="旧代码"
            dataIndex="origin"
            key="origin"
            render={(origin) => <Tooltip title={origin}>{origin}</Tooltip>}
          />
          <Column
            ellipsis
            title="目标代码"
            dataIndex="target"
            key="target"
            render={(target) => <Tooltip title={target}>{target}</Tooltip>}
          />
          <Column
            ellipsis
            title="描述"
            dataIndex="description"
            key="description"
            render={(description) => (
              <Tooltip title={description}>
                {description === "" ? "无" : description}
              </Tooltip>
            )}
          />
          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  type="primary"
                  size={"small"}
                  onClick={(e) => handleDetail(e, record)}
                >
                  查看
                </Button>
                <Button
                  type="primary"
                  size={"small"}
                  danger
                  onClick={(e) => handleDel(e, record)}
                >
                  删除
                </Button>
              </Space>
            )}
          />
        </Table>
      </Row>

      <Row justify={"center"}>
        <Button
          type="primary"
          className="generate-btn"
          icon={<BulbOutlined />}
          onClick={generateCode}
        >
          生成
        </Button>
      </Row>

      <Row>
        <TextArea
          rows={4}
          disabled
          autoSize={{ minRows: 4, maxRows: 4 }}
          placeholder="生成的内容"
          className="output-text-area"
          value={aiText}
        />
      </Row>

      <Detail
        item={detailItem}
        isModalOpen={isModalOpen}
        handleOk={() => setModalOpen(false)}
        handleCancel={() => setModalOpen(false)}
      />

      <AddModal
        isModalOpen={isAddModalOpen}
        getSubmitData={getSubmitData}
        handleOk={() => setAddModalOpen(false)}
        handleCancel={() => setAddModalOpen(false)}
      />
    </div>
  );
};

export default Imitate;
