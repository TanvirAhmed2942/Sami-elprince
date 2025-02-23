import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="lg:h-[100vh] w-screen bg-[#f8f8f8] relative">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-[280px] h-full bg-prince shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[280px] ">
        <Header />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
