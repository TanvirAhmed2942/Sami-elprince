import React from "react";
import { Modal, Descriptions, Avatar } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { PiMapPinLight, PiShareFatLight } from "react-icons/pi";
import { FiPhoneCall } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { RiMessageLine } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";
import { CgSoftwareDownload } from "react-icons/cg";
import BudgetQuottation from "./BudgetQuottation";

const ViewModalPending = ({
  visible,
  onClose,
  record,
  handleAccept,
  handleDelete,
}) => {
  if (!record) return null;

  return (
    <Modal
      // title="Service Request Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      height={850}
      centered
    >
      <div
        className="h-[300px] mt-10 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="flex items-center border h-[100px] p-3 rounded-lg gap-3  ">
          <Avatar src={record.avatar} size={80} shape="square" />
          <div className="flex w-full h-full items-start justify-between">
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-[20px] font-medium">{record.customername}</h2>
              <div className="flex gap-10">
                <h2 className="text-[16px] font-normal text-paragraph flex items-center gap-2 p-1.5 rounded-lg bg-gray-200">
                  <PiMapPinLight />
                  {/* {record.address} */}
                  Address 1
                </h2>
                <h2 className="text-[16px] font-normal  text-paragraph flex items-center gap-2 p-1.5 rounded-lg bg-gray-200">
                  <FiPhoneCall />
                  +1236-44454
                </h2>
                <h2 className="text-[16px] font-normal  text-paragraph flex items-center gap-2 p-1.5 rounded-lg bg-gray-200">
                  <MdDateRange />
                  25 Jan 2025
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <h1 className="text-[20px] font-medium">Service</h1>
          <div className="flex flex-col gap-2 border rounded-lg p-3">
            <h1 className="text-[16px] font-medium">
              Need Building compliance Certificate for my new building
            </h1>
            <h4 className="bg-[#f5effb] px-2 py-0.5 rounded-lg w-fit">
              {record.servicename}
            </h4>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <h1 className="text-[20px] font-medium">Service Details</h1>
          <div className="flex flex-col gap-2 border rounded-lg p-3">
            <p className="text-[16px] font-normal text-paragraph">
              We need assistance in obtaining a Building Compliance Certificate
              for a newly constructed residential property. The property
              includes a 3-story building with 8 units. All construction work
              has been completed, and we require a professional to verify
              compliance with local building codes and regulations. Necessary
              documents and plans will be provided upon request.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3  w-1/3">
          <h1 className="text-[20px] font-medium">Attachment</h1>
          <div className="flex flex-col gap-2 border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BiSolidFilePdf size={50} />
                <div>
                  <h2 className="text-[14px] font-medium">File Title.pdf</h2>
                  <p>313 KB . 31 Aug, 2022 </p>
                </div>
              </div>

              <CgSoftwareDownload
                size={25}
                className="text-green-400 hover:text-green-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-6" />
      <div className="flex flex-col gap-3 my-6 w-full h-[400px]">
        <BudgetQuottation />
      </div>
    </Modal>
  );
};

export default ViewModalPending;
