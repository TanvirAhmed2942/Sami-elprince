import React from "react";
import { Modal, Descriptions, Avatar } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const ViewModal = ({ visible, onClose, record }) => {
  if (!record) return null;

  return (
    <Modal
      title="Service Request Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="w-full flex justify-end gap-2">
        <button className="bg-green-400 hover:bg-green-500 flex gap-2 rounded-lg px-3 py-1">
          <CheckOutlined />
          Acceppt
        </button>
        <button className="bg-red-400 hover:bg-red-500 flex gap-2 rounded-lg px-3 py-1">
          <CloseOutlined />
          Reject
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar src={record.avatar} size={64} shape="square" />
        <h2 className="text-lg font-semibold">{record.customername}</h2>
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Email">{record.service}</Descriptions.Item>
        {/* <Descriptions.Item label="Phone">{record.phone}</Descriptions.Item> */}
        <Descriptions.Item label="Address">{record.address}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ViewModal;
