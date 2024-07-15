import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const showConfirm = (title, content, handleOk, handleCancel) => {
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: content,
    onOk: () => handleOk(),

    onCancel: () => handleCancel(),
  });
};

export { showConfirm };
