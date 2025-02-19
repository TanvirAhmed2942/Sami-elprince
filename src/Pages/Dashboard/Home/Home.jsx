import React, { useState } from "react";
import { DatePicker } from "antd";
import { MdOutlineDateRange } from "react-icons/md";
import shop from "../../../assets/gtdandy/icons/shop.png";
import warehouse from "../../../assets/gtdandy/icons/warehouse.png";
import money from "../../../assets/gtdandy/icons/money.png";
import UserStatistics from "./UserStatistics";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const stats = [
  { label: "User", value: "100", icon: warehouse, bg: "bg-[#f4f6fd]" },
  { label: "Service Provider", value: "12K", icon: shop, bg: "bg-[#f3f3ff]" },
  { label: "Total Earn", value: "$2065", icon: money, bg: "bg-[#e1f9ec]" },
];

const Card = ({ item }) => {
  return (
    <div className="flex items-center w-80 h-32 rounded-xl bg-white gap-5">
      <div
        className={`${item.bg} w-20 h-20 flex items-center justify-center rounded-full ml-8`}
      >
        <img src={item.icon} width={32} alt={item.label} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-[32px] font-semibold">{item.value}</h1>
        <p className="text-[18px] text-paragraph font-medium">{item.label}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const { RangePicker } = DatePicker;
  const [selectedDates, setSelectedDates] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const dateFormat = "D MMM YYYY"; // Example: 4 Dec 2021

  const handleDateChange = (values, formatStrings) => {
    console.log("Selected Dates (Dayjs objects):", values);
    console.log("Formatted Dates (Strings):", formatStrings);
    setSelectedDates(formatStrings);
    setIsDateSelected(!!values);
  };

  return (
    <div className="px-10">
      <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md">
        <RangePicker
          format={dateFormat} // Custom date format
          onChange={handleDateChange} // Handle selection
          className="border-none py-2 rounded-lg"
          suffixIcon={
            <div
              className="rounded-full w-6 h-6 p-1 flex items-center justify-center"
              style={{
                backgroundColor: isDateSelected ? "#975cdb" : "#f5effb",
              }}
            >
              <MdOutlineDateRange
                color={isDateSelected ? "white" : "#975cdb"}
              />
            </div>
          }
        />

        <div className="flex items-center sm:flex-wrap gap-2 w-full">
          {stats.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="w-full h-[500px] p-4 bg-white rounded mt-4 relative shadow-md flex flex-col justify-evenly">
        <UserStatistics />
      </div>
    </div>
  );
};

export default Home;
