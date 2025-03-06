import React, { useState } from "react";
import { Form, Input, Table, Avatar, Button, ConfigProvider } from "antd";
import { BsFillEyeFill } from "react-icons/bs";
import ViewModalPending from "./ViewModalPending";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
const ActionButtons = ({ record, handleView }) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => handleView(record)}
      >
        <BsFillEyeFill size={20} />
      </button>
    </div>
  );
};

const PendingTable = ({ data, setData }) => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleView = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleDeleteSelected = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]); // Clear selection after deleting
  };

  const filteredData = data.filter((item) =>
    [
      // item.orderid,
      item.customername,
      item.servicename,
      item.budgetreceived,
    ].some((field) => field.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    // { title: "#Order Id", dataIndex: "orderid", width: "15%" },
    {
      title: "Customer Name",
      dataIndex: "customername",
      width: "30%",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} shape="square" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Service",
      dataIndex: "servicename",
      width: "30%",
      // render: (text, record) => (
      //   <div className="flex items-center gap-2">
      //     <Avatar src={record.serviceAvatar} shape="circle" />
      //     <span>{text}</span>
      //   </div>
      // ),
    },
    { title: "Budget Received", dataIndex: "budgetreceived", width: "20%" },

    {
      title: "Action (view)",
      dataIndex: "action",
      width: "15%",
      render: (_, record) => (
        <ActionButtons record={record} handleView={handleView} />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">Pending Projects</h1>
        <div className="flex gap-2">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: "#975cdb ",
                  defaultHoverColor: "white",
                  defaultHoverBorderColor: "#975cdb ",
                },
              },
            }}
          >
            <Input
              placeholder="Search by Order ID, Name, Provider..."
              value={searchText}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="h-9"
            />
            {selectedRowKeys.length > 1 && (
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDeleteSelected}
                className="bg-prince/90 h-9 text-white hover:bg-prince border-none"
              >
                {selectedRowKeys.length === data.length
                  ? "Delete All"
                  : "Delete Selected"}
              </Button>
            )}
          </ConfigProvider>
        </div>
      </div>
      <div className="px-10">
        <Form form={form} component={false}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  rowSelectedBg: "#f5effb",
                  headerBg: "#f5effb",
                },
                Pagination: {
                  borderRadius: "3px",
                  itemActiveBg: "#975cdb",
                  // itemHoverBg: "#ffffff",
                  itemBg: "#000000",
                },
                Button: {
                  defaultHoverBg: "#975cdb ",
                  defaultHoverColor: "white",
                  defaultHoverBorderColor: "#975cdb ",
                },
              },
            }}
          >
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              bordered
              dataSource={filteredData}
              columns={columns}
              rowClassName="editable-row"
              pagination={{ defaultPageSize: 5, position: ["bottomCenter"] }}
            />
          </ConfigProvider>
        </Form>
      </div>
      <ViewModalPending
        visible={modalVisible}
        onClose={closeModal}
        record={selectedRecord}
      />
    </>
  );
};

const PendingProject = () => {
  const originData = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    // orderid: `ORD${1000 + i}`, // Unique Order ID
    customername: `Edward ${i}`,
    servicename: `Provider ${i}`,

    budgetreceived: `$${(Math.random() * 1000).toFixed(2)}`,

    avatar: `https://i.pravatar.cc/50?img=${i % 50}`,
    // serviceAvatar: `https://i.pravatar.cc/50?img=${(i + 10) % 50}`, // Different avatar for service provider
  }));
  const [data, setData] = useState(originData);

  return <PendingTable data={data} setData={setData} />;
};

export default PendingProject;
