import React, { useState } from "react";
import { Form, Input, Popconfirm, Table, Avatar, message } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiPlus, TiTick } from "react-icons/ti";
import { BsFillEyeFill } from "react-icons/bs";
import ViewModal from "./ViewModal";

const ActionButtons = ({ record, handleAccept, handleDelete, handleView }) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => handleView(record)}
      >
        <BsFillEyeFill size={20} />
      </button>
      <button
        className="text-green-400 hover:text-green-600"
        onClick={() => handleAccept(record)}
      >
        <TiTick size={25} />
      </button>
      <Popconfirm
        title="Are you sure to delete?"
        onConfirm={() => handleDelete(record.key)}
      >
        <button className="text-red-400 hover:text-red-600">
          <TiPlus size={25} className="rotate-45" />
        </button>
      </Popconfirm>
    </div>
  );
};

const CustomerTable = ({ data, setData }) => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // const handleAccept = (record) => {
  //   alert(`Accepted request for ${record.customername}`);
  // };
  const handleAccept = (record) => {
    message.success(`Accepted request for ${record.customername}`);
    setModalVisible(false); // Close modal after accepting
  };

  const handleDelete = (key) => {
    setData((prevData) => {
      const updatedData = prevData.filter((item) => item.key !== key);
      return updatedData;
    });

    message.success("Rejected successfully"); // Show success message
    setModalVisible(false); // Close modal after deleting
  };

  const handleDeleteSelected = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]); // Clear the selection after deletion
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleView = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  // const filteredData = data.filter((item) =>
  //   [item.customername, item.email, item.phone, item.address].some((field) =>
  //     field.toLowerCase().includes(searchText.toLowerCase())
  //   )
  // );

  const filteredData = data.filter((item) =>
    [item.customername, item.service, item.address].some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customername",
      width: "20%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} shape="square" />
          <span>{text}</span>
        </div>
      ),
    },
    { title: "Service", dataIndex: "service", width: "25%" },
    { title: "Address", dataIndex: "address", width: "25%" },
    {
      title: "Action (view/accept/reject)",
      dataIndex: "action",
      render: (_, record) => (
        <ActionButtons
          record={record}
          handleAccept={handleAccept}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">New Request</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200, height: 40 }}
          />
          {selectedRowKeys.length > 1 && ( // Only show button if more than one row is selected
            <button
              className="bg-prince text-white py-2 px-4 rounded hover:bg-purple-600"
              onClick={handleDeleteSelected}
            >
              {selectedRowKeys.length === data.length
                ? "Delete All"
                : "Delete Selected"}
            </button>
          )}
        </div>
      </div>
      {/* <div className="flex justify-end px-10"> */}

      {/* </div> */}
      <div className="px-10">
        <Form form={form} component={false}>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            bordered
            dataSource={filteredData}
            columns={columns}
            rowClassName="editable-row"
            pagination={{ defaultPageSize: 5 }}
          />
        </Form>
      </div>
      <ViewModal
        visible={modalVisible}
        onClose={closeModal}
        record={selectedRecord}
        handleAccept={handleAccept} // Ensure these functions exist
        handleDelete={handleDelete}
      />
    </>
  );
};

const NewRequest = () => {
  const originData = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    customername: `Edward ${i}`,
    service: `Service ${i}`,
    address: `London Park no. ${i}`,
    avatar: "https://i.pravatar.cc/50?img=2",
  }));
  const [data, setData] = useState(originData);

  return <CustomerTable data={data} setData={setData} />;
};

export default NewRequest;
