import { Modal, message, Form, Input } from "antd";
import { useState } from "react";
const AddModal = ({ isModalOpen, getSubmitData, handleOk, handleCancel }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { TextArea } = Input;
  const clickCancel = () => {
    handleCancel();
    messageApi.open({
      type: "error",
      content: "已取消",
    });
  };
  const [dataObj, setDataObj] = useState({
    language: "",
    origin: "",
    target: "",
    description: "",
  });

  const clickOk = () => {
    getSubmitData(dataObj);
    handleOk();
    setDataObj({
      language: dataObj.language,
      origin: "",
      target: "",
      description: "",
    });
    messageApi.open({
      type: "success",
      content: "添加成功",
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isModalOpen}
        onOk={clickOk}
        onCancel={clickCancel}
        okText="添加"
        cancelText="取消"
      >
        <Form layout="vertical">
          <Form.Item label="语言">
            <Input
              value={dataObj.language}
              placeholder="描述语言(一般为编程语言)"
              onChange={(e) =>
                setDataObj({ ...dataObj, language: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="旧代码">
            <TextArea
              placeholder="填入修改前的代码"
              autoSize={{ minRows: 5, maxRows: 5 }}
              value={dataObj.origin}
              onChange={(e) =>
                setDataObj({ ...dataObj, origin: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="目标代码">
            <TextArea
              value={dataObj.target}
              placeholder="填入修改后的代码"
              autoSize={{ minRows: 5, maxRows: 5 }}
              onChange={(e) =>
                setDataObj({ ...dataObj, target: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="补充描述">
            <TextArea
              value={dataObj.description}
              placeholder="对代码的补充描述，例如数据类型"
              autoSize={{ minRows: 3, maxRows: 3 }}
              onChange={(e) =>
                setDataObj({ ...dataObj, description: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
