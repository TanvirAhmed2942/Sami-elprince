import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  ConfigProvider,
  Avatar,
} from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import GetPageName from "../../../components/common/GetPageName";

const originData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  customername: `Edward ${i}`,
  email: `edward${i}@mail.com`,
  phone: `12345678${i}`,
  address: `London Park no. ${i}`,
  avatar: "",
}));

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Customer = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [searchText, setSearchText] = useState(""); // State for search input
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => setEditingKey("");

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => item.key === key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setData(newData);
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Function to filter table based on search text
  const filteredData = data.filter(
    (item) =>
      item.customername.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.includes(searchText) ||
      item.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customername",
      width: "20%",
      editable: true,
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.avatar} alt={text} shape="square" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="flex items-center justify-start gap-4">
            <button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              className="text-sky-500 hover:text-sky-600"
            >
              <FiEdit3 size={20} />
            </button>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <button className="text-red-400 hover:text-red-600">
                <RiDeleteBin6Line size={20} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) =>
      col.editable
        ? {
            inputType: col.dataIndex === "phone" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }
        : undefined,
  }));

  return (
    <>
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <Input
          placeholder="Search by name, email, phone, or address"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 200, height: 40 }}
        />
      </div>

      <div className=" px-10">
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
              rowSelection={rowSelection}
              components={{ body: { cell: EditableCell } }}
              bordered
              dataSource={filteredData} // Apply filtering here
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
                defaultPageSize: 5,
                position: ["bottomCenter"],
              }}
            />
          </ConfigProvider>
        </Form>
      </div>
    </>
  );
};

export default Customer;

// const originData = [
//   {
//     key: "1",
//     customername: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "9876543210",
//     address: "123 Maple Street, NY",
//     avatar: "https://i.pravatar.cc/50?img=1",
//   },
//   {
//     key: "2",
//     customername: "Bob Smith",
//     email: "bobsmith22@gmail.com",
//     phone: "5556677889",
//     address: "456 Oak Avenue, CA",
//     avatar: "https://i.pravatar.cc/50?img=2",
//   },
//   {
//     key: "3",
//     customername: "Charlie Brown",
//     email: "charlie.b@example.org",
//     phone: "1112233445",
//     address: "789 Pine Road, TX",
//     avatar: "https://i.pravatar.cc/50?img=3",
//   },
//   {
//     key: "4",
//     customername: "David Williams",
//     email: "david_w@example.net",
//     phone: "9998887776",
//     address: "101 Cedar Blvd, FL",
//     avatar: "https://i.pravatar.cc/50?img=4",
//   },
//   {
//     key: "5",
//     customername: "Emma Davis",
//     email: "emma_d@example.com",
//     phone: "6665554443",
//     address: "202 Birch Lane, NV",
//     avatar: "https://i.pravatar.cc/50?img=5",
//   },
//   {
//     key: "6",
//     customername: "Franklin Carter",
//     email: "frank.carter@company.com",
//     phone: "3332221110",
//     address: "303 Redwood St, WA",
//     avatar: "https://i.pravatar.cc/50?img=6",
//   },
//   {
//     key: "7",
//     customername: "Grace Miller",
//     email: "grace_m@example.io",
//     phone: "4447779998",
//     address: "404 Walnut Dr, OR",
//     avatar: "https://i.pravatar.cc/50?img=7",
//   },
//   {
//     key: "8",
//     customername: "Henry White",
//     email: "henryw@example.com",
//     phone: "2223334445",
//     address: "505 Elm Circle, CO",
//     avatar: "https://i.pravatar.cc/50?img=8",
//   },
//   {
//     key: "9",
//     customername: "Ivy Scott",
//     email: "ivy.scott@example.org",
//     phone: "7778889996",
//     address: "606 Spruce Ct, GA",
//     avatar: "https://i.pravatar.cc/50?img=9",
//   },
//   {
//     key: "10",
//     customername: "Jack Anderson",
//     email: "jack_anderson@example.net",
//     phone: "1234567890",
//     address: "707 Cedar Rd, IL",
//     avatar: "https://i.pravatar.cc/50?img=10",
//   },
// ];
