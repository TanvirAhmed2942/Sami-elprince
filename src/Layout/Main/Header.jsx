import React from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Badge, Space, Flex } from "antd";
import { Avatar, Dropdown, ConfigProvider } from "antd";
import { useUser } from "../../provider/User";

const Header = () => {
  const { user } = useUser();
  const src = user?.image?.startsWith("https")
    ? user?.image
    : `${imageUrl}/${user?.image}`;

  const items = [
    {
      label: <Link to="auth/login">Log Out</Link>,
      key: "0",
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: "16px",
          colorPrimaryBorderHover: "red",
        },
        components: {
          Dropdown: {
            paddingBlock: "5px",
          },
        },
      }}
    >
      <Flex
        align="center"
        justify="end"
        className="w-100% h-[100px] px-10 py-2 shadow-sm overflow-auto bg-white"
      >
        {/* Right-side icons and user info */}
        <Flex align="center" gap={30} justify="flex-end">
          {/* Notification Badge */}
          <div className="w-8 h-8 bg-[#f5effb] flex items-center justify-center p-6 rounded-md relative">
            <Link to="/notification" className="flex">
              <FaRegBell color="#975CDB" size={30} className="relative" />
              <Badge dot className="absolute top-[30%] left-[55%]" />
            </Link>
          </div>

          {/* User Profile */}
          <Link to="/setting" className="flex items-center gap-3">
            <Avatar shape="square" size={60} className="rounded" src={src} />
          </Link>

          {/* Dropdown Menu */}
          <Flex vertical align="start">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {`${user?.firstName} ${user?.lastName}`}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <p>Super Admin</p>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default Header;
