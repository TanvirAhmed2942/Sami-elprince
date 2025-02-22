// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { MdOutlineDateRange } from "react-icons/md";
// import { DatePicker } from "antd";
// const data = [
//   { name: "Jan", pv: 2400, amt: 2400 },
//   { name: "Feb", pv: 1398, amt: 2210 },
//   { name: "Mar", pv: 9800, amt: 2290 },
//   { name: "Apr", pv: 3908, amt: 2000 },
//   { name: "May", pv: 4800, amt: 2181 },
//   { name: "Jun", pv: 3800, amt: 2500 },
//   { name: "Jul", pv: 4300, amt: 2100 },
//   { name: "Aug", pv: 3200, amt: 2600 },
//   { name: "Sep", pv: 4500, amt: 2700 },
//   { name: "Oct", pv: 5000, amt: 2800 },
//   { name: "Nov", pv: 5200, amt: 3000 },
//   { name: "Dec", pv: 6000, amt: 3200 },
// ];

// export default function UserStatistics() {
//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//   };
//   return (
//     <>
//       <div className="flex items-center justify-between px-6">
//         <h2 className="text-lg font-medium">Earning</h2>
//         <DatePicker
//           onChange={onChange}
//           picker="year"
//           className="border-1 h-8 w-28"
//           suffixIcon={
//             <div className="rounded-full w-6 h-6 p-1 bg-[#f5effb] flex items-center justify-center">
//               <MdOutlineDateRange color="#975cdb" />
//             </div>
//           }
//         />
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={data}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           width={10}
//           height={80}
//         >
//           <CartesianGrid
//             strokeDasharray="none"
//             strokeWidth={0.2}
//             vertical={false}
//           />
//           <XAxis dataKey="name" />
//           <YAxis hide={false} />
//           <Tooltip />
//           {/* <Legend /> */}
//           {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
//           <Bar dataKey="pv" fill="#975CDB" barSize={25} />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// }

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MdOutlineDateRange } from "react-icons/md";
import { DatePicker } from "antd";

const data = [
  { name: "Jan", pv: 2400, amt: 2400 },
  { name: "Feb", pv: 1398, amt: 2210 },
  { name: "Mar", pv: 9800, amt: 2290 },
  { name: "Apr", pv: 3908, amt: 2000 },
  { name: "May", pv: 4800, amt: 2181 },
  { name: "Jun", pv: 3800, amt: 2500 },
  { name: "Jul", pv: 4300, amt: 2100 },
  { name: "Aug", pv: 3200, amt: 2600 },
  { name: "Sep", pv: 4500, amt: 2700 },
  { name: "Oct", pv: 5000, amt: 2800 },
  { name: "Nov", pv: 5200, amt: 3000 },
  { name: "Dec", pv: 6000, amt: 3200 },
];

export default function UserStatistics() {
  const [isDateSelected, setIsDateSelected] = useState(false);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setIsDateSelected(!!date); // Update state based on date selection
  };

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <h2 className="text-lg font-medium">Earning</h2>
        <DatePicker
          onChange={onChange}
          picker="year"
          className="border-1 h-8 w-28 py-2 rounded-lg"
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
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="none"
            strokeWidth={0.2}
            vertical={false}
          />
          <XAxis dataKey="name" />
          <YAxis hide={false} />
          {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
          <Tooltip
            content={<CustomTooltip />}
            // cursor={{ fill: "transparent" }}
            isAnimationActive={true}
            cursor={false}
          />
          <Bar dataKey="pv" fill="#975CDB" barSize={35} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        {/* Arrow (pointing left) */}
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-prince -left-2"></div>

        {/* Tooltip Content */}
        <div className="bg-prince p-2 text-white rounded shadow-md ">
          {payload.map((pld, index) => (
            <div key={index}>{pld.value}K</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
