import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Col, Flex, Row } from "antd";

const Main = () => {
  return (
    <div className="h-[100vh] bg-[#f8f8f8] relative">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-[280px] h-full bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[250px]">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
