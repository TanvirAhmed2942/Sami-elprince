import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbBellBolt, TbDashboard, TbDatabaseDollar } from "react-icons/tb";

import { RxDashboard } from "react-icons/rx";

import { PiWallet } from "react-icons/pi";

import { PiCirclesThreePlusLight } from "react-icons/pi";
import { RiSettings5Line } from "react-icons/ri";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { FaHandsHelping } from "react-icons/fa";
import { FaDiagramProject } from "react-icons/fa6";
import { CgTemplate } from "react-icons/cg";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: <Link to="/">Overview</Link>,
    },
    // {
    //   key: "/contents",
    //   icon: <PiCopyBold size={24} />,
    //   label: <Link to="/contents">Contnets</Link>,
    // },
    {
      key: "/serviceproviders",
      icon: <FaHandsHelping size={24} />,
      label: <Link to="/serviceproviders">Service Provider</Link>,
    },
    // {
    //   key: "/earnings",
    //   icon: <TbDatabaseDollar size={24} />,
    //   label: <Link to="/earnings">Earnings</Link>,
    // },
    // {
    //   key: "/insight",
    //   icon: <TbBulbFilled size={24} />,
    //   label: <Link to="/insight">Insightful Tips</Link>,
    // },
    {
      key: "/transaction",
      icon: <PiWallet size={25} />,
      label: <Link to="/transaction">Transaction</Link>,
    },
    // {
    //   key: "/blogs",
    //   icon: <IoNewspaper size={24} />,
    //   label: <Link to="/blogs">Blogs</Link>,
    // },
    // {
    //   key: "/medicalhistory",
    //   icon: <IoBriefcase size={24} />,
    //   label: <Link to="/medicalhistory">Medical History</Link>,
    // },
    // {
    //     key: "/artists",
    //     icon: <HiUsers size={24} />,
    //     label: <Link to="/artists">Artists</Link>
    // },
    // {
    //     key: "/users",
    //     icon: <HiUserGroup size={24} />,
    //     label: <Link to="/users">User</Link>
    // },

    /* {
            key: "/admin",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            label: <Link to="/admin">Make Admin</Link>
        }, */
    {
      key: "/customer",
      icon: <FiUsers size={23} />,
      label: <Link to="/customer">Customer</Link>,
    },
    {
      key: "subMenuSetting1",
      icon: <FaDiagramProject size={23} />,
      label: "Project",
      children: [
        {
          key: "/newrequest",
          label: (
            <Link to="/newrequest" className="text-white">
              New Request
            </Link>
          ),
        },
        {
          key: "/activeproject",
          label: (
            <Link to="/activeproject" className="text-white hover:text-white">
              Active Project
            </Link>
          ),
        },
        {
          key: "/pendingproject",
          label: (
            <Link to="/pendingproject" className="text-white hover:text-white">
              Pending Project
            </Link>
          ),
        },
      ],
    },
    // {
    //     key: "/sub-category",
    //     icon: <BiSolidCategory size={24} />,
    //     label: <Link to="/sub-category" >Sub Category</Link>
    // },
    {
      key: "/pushnotification",
      icon: <TbBellBolt size={24} />,
      label: <Link to="/pushnotification">PushNotification</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <CgTemplate size={24} />,
      label: "Cms",
      children: [
        // {
        //   key: "/banner",
        //   label: (
        //     <Link to="/banner" className="text-white hover:text-white">
        //       Banner
        //     </Link>
        //   ),
        // },
        // {
        //   key: "/profile",
        //   label: (
        //     <Link to="/profile" className="text-white hover:text-white">
        //       Personal Information
        //     </Link>
        //   ),
        // },

        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/faq",
          label: (
            <Link to="/faq" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
        {
          key: "/contact",
          label: (
            <Link to="/contact" className="text-white hover:text-white">
              Contact Us
            </Link>
          ),
        },
        // {
        //   key: "/change-password",
        //   label: (
        //     <Link to="/change-password" className="text-white hover:text-white">
        //       Change Password
        //     </Link>
        //   ),
        // },
      ],
    },

    {
      key: "/setting",
      icon: <RiSettings5Line size={24} />,
      label: <Link to="/setting">Setting</Link>,
    },
    {
      key: "/logout",
      icon: <FiLogOut size={24} color="white" />,
      label: (
        <p onClick={handleLogout} className="text-white hover:text-white">
          Logout
        </p>
      ),
    },

    // {
    //   key: "/subscription",
    //   icon: <HiTicket size={24} />,
    //   label: <Link to="/subscription">Subscription</Link>,
    // },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="w-auto bg-prince  mt-20  h-[full]">
      <Link
        to={"/"}
        className=" flex items-center justify-center py-4 text-white"
      >
        <div className="w-auto flex items-center justify-center bg-prince border border-gtdandy px-10 py-3 gap-5 rounded-lg">
          <TbDashboard size={30} className=" text-white" />
          <p className="text-4xl font-semibold text-[18px] font-sans tracking-wider text-white">
            Dashboard
          </p>
        </div>
      </Link>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "#975cdb" }}
        items={menuItems}
        className="space-y-5 text-white mt-10"
      />
    </div>
  );
};

export default Sidebar;
