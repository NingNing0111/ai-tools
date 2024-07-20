import { Col, Form, Row, Input, Button } from "antd";
import "./index.css";
const Setting = () => {
  return (
    <div>
      <Row justify={"center"} align={"middle"}>
        <Col span={16} className="setting-box">
          <Form
            labelCol={{
              span: 8,
            }}
          >
            <Form.Item label="Base URL" name="url">
              <Input placeholder="https://api.openai.com" />
            </Form.Item>
            <Form.Item
              label="API Key"
              name="key"
              rules={[
                {
                  required: true,
                  message: "请输入Key",
                },
              ]}
            >
              <Input placeholder="请输入API Key" />
            </Form.Item>
            <Form.Item label="模型" name="model"></Form.Item>
          </Form>
        </Col>
        <Row>
          <Button>提交</Button>
        </Row>
      </Row>
    </div>
  );
};

export default Setting;
