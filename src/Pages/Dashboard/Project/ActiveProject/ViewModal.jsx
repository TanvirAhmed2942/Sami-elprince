import React from "react";
import { Modal, Avatar, Steps, ConfigProvider } from "antd";
import { PiMapPinLight } from "react-icons/pi";
import { FiPhoneCall } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import { RiMessageLine } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";
import { CgSoftwareDownload } from "react-icons/cg";

const ViewModal = ({ visible, onClose, record }) => {
  if (!record) return null;

  const renderUserCard = (title, avatar, name, address, phone, date) => (
    <div className="flex flex-col w-[48%]">
      <h1 className="text-[20px] font-medium mb-3">{title}</h1>
      <div className="flex border p-3 rounded-lg gap-3 mb-6">
        <Avatar src={avatar} size={120} shape="square" />
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col justify-between">
            <h2 className="text-[20px] font-medium">{name}</h2>
            <h2 className="text-[16px] font-normal text-paragraph flex items-center gap-2">
              <PiMapPinLight /> {address}
            </h2>
            <h2 className="text-[16px] font-normal text-paragraph flex items-center gap-2">
              <FiPhoneCall /> {phone}
            </h2>
            <h2 className="text-[16px] font-normal text-paragraph flex items-center gap-2">
              <MdDateRange /> {date}
            </h2>
          </div>
          <button>
            <RiMessageLine
              size={30}
              className="text-prince hover:-scale-x-100 hover:translate-x-1 hover:transition-all duration-100"
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      centered
    >
      <div className="py-10 px-5">
        <div className="p-5 rounded-lg border mb-6">
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  dotSize: 15,
                  dotCurrentSize: 20,
                },
              },
              token: {
                primaryColor: "#975cdb",
                successColor: "#2ecc71",
                warningColor: "#FFC301",
                errorColor: "#E74C3C",
                lineHeight: 1.3,
              },
            }}
          >
            <Steps
              progressDot
              current={3}
              items={[
                {
                  title: "Quotation Accepted",
                },
                {
                  title: "In Progress",
                },
                {
                  title: "Order Complete",
                },
              ]}
            />
          </ConfigProvider>
        </div>
        <div className="flex w-full justify-between">
          {renderUserCard(
            "Customer",
            record.avatar,
            record.customername,
            "Address 1",
            "+1236-44454",
            "25 Jan 2025"
          )}
          {renderUserCard(
            "Service Provider",
            record.serviceAvatar,
            record.serviceprovider,
            "Address 1",
            "+1236-44454",
            "25 Jan 2025"
          )}
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <h1 className="text-[20px] font-medium">Service</h1>
          <div className="flex flex-col gap-2 border rounded-lg p-3">
            <h1 className="text-[16px] font-medium">
              Need Building compliance Certificate for my new building
            </h1>
            <h4 className="bg-[#f5effb] px-2 py-0.5 rounded-lg w-fit">
              // backend data
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
        <div className="flex flex-col gap-3 w-1/3">
          <h1 className="text-[20px] font-medium">Attachment</h1>
          <div className="flex flex-col gap-2 border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BiSolidFilePdf size={50} />
                <div>
                  <h2 className="text-[14px] font-medium">File Title.pdf</h2>
                  <p>313 KB . 31 Aug, 2022</p>
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
    </Modal>
  );
};

export default ViewModal;
