import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
const CustomerModal: React.FC<
  {
    negativeBtnText?: string;
    positiveBtnText?: string;
  } & ModalProps
> = (props) => {
  const {
    visible = false,
    title,
    positiveBtnText = "确定",
    negativeBtnText = "取消",
    children,
    onCancel,
    onOk,
    ...restModalProps
  } = props;
  return (
    <Modal
      visible={visible}
      maskClosable={false}
      title={title}
      footer={[
        { text: negativeBtnText, onPress: onCancel },
        { text: positiveBtnText, onPress: onOk },
      ]}
      {...restModalProps}
    >
      {children}
    </Modal>
  );
};

export default CustomerModal;
