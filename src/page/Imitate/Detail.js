import { Modal, Descriptions } from "antd";
const Detail = ({ item, isModalOpen, handleOk, handleCancel }) => {
  const items = [
    {
      key: "1",
      label: "语言",
      children: item.language ?? "",
    },
    {
      key: "2",
      label: "旧代码",
      children: item.origin ?? "",
    },
    {
      key: "3",
      label: "目标代码",
      children: item.target ?? "",
    },
    {
      key: "4",
      label: "描述",
      children: item.description ?? "",
    },
  ];

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确定"
      cancelText="关闭"
    >
      <Descriptions title="示例详情" column={1} bordered items={items} />
    </Modal>
  );
};

export default Detail;
