import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd"; // Import Button
import shop from "../../../assets/gtdandy/icons/shop.png";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function ServiceProvidersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows
  const [userData, setUserData] = useState(data); // Store user data

  // Handle Search
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Filter data based on search query
  const filteredData = userData.filter(
    (user) =>
      user.providersname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Delete selected users
  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]); // Reset selection
  };

  return (
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
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">Service Providers</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Name, Email or Phone"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            // style={{ width: 200, height: 42 }}
            className="h-9"
          />
          {selectedRowKeys.length > 0 && (
            <Button
              // type="primary"
              // danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              className="bg-[#9d6fd6] text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        className="px-10"
        pagination={{
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          position: ["bottomCenter"],
        }}
      />
    </ConfigProvider>
  );
}

export default ServiceProvidersList;

function UserAvatar({ user, providersname }) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar shape="square" size={40} src={user} />
      <p>{providersname}</p>
    </div>
  );
}

const columns = [
  {
    title: "Service Provider Name",
    dataIndex: "providersname",
    key: "providersname",
    render: (providersname) => (
      <UserAvatar providersname={providersname} user={shop} />
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Addess",
    dataIndex: "address",
    key: "address",
  },
  {
    key: "action",
    render: () => <MoreOutlined className="cursor-pointer w-10 h-10" />,
  },
];

const data = [
  {
    key: 1,
    providersname: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 2,
    providersname: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 3,
    providersname: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 4,
    providersname: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 5,
    providersname: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 6,
    providersname: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 7,
    providersname: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 8,
    providersname: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 9,
    providersname: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 10,
    providersname: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 11,
    providersname: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
  {
    key: 12,
    providersname: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    address: "10 Warehouse Road, Apapa, Lagos",
  },
];
