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
  Button,
} from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import GetPageName from "../../../components/common/GetPageName";
import { SearchOutlined } from "@ant-design/icons";
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

  const handleDeleteSelected = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]); // Reset selected rows
  };

  const handleDeleteAll = () => {
    setData([]);
    setSelectedRowKeys([]); // Reset selected rows
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
        <div className="flex justify-between items-center px-10 py-5">
          <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name, email, phone, or address"
              value={searchText}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="h-9"
            />
            {selectedRowKeys.length >= 2 && (
              <Popconfirm
                title={
                  selectedRowKeys.length === data.length
                    ? "Are you sure to delete all?"
                    : "Are you sure to delete selected?"
                }
                onConfirm={
                  selectedRowKeys.length === data.length
                    ? handleDeleteAll
                    : handleDeleteSelected
                }
              >
                <Button
                  icon={<RiDeleteBin6Line />}
                  style={{ marginLeft: 8 }}
                  className="bg-prince/90 h-9 text-white hover:bg-prince border-none"
                >
                  {selectedRowKeys.length === data.length
                    ? "Delete All"
                    : "Delete Selected"}
                </Button>
              </Popconfirm>
            )}
          </div>
        </div>

        <div className=" px-10">
          <Form form={form} component={false}>
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
          </Form>
        </div>
      </ConfigProvider>
    </>
  );
};

export default Customer;
