import React from "react";
import { Select, Space, ConfigProvider } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Filter() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            hoverBorderColor: "#ffeaa9",
          },
        },
      }}
    >
      <div className="shadow-md rounded mr-12 absolute top-0 right-0 mt-4">
        <Space wrap>
          <Select
            defaultValue="2024"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "2023", label: "2023" },
              { value: "2024", label: "2024" },
              { value: "2025", label: "2025" },
              { value: "2026", label: "2026" },
            ]}
          />
        </Space>
      </div>
    </ConfigProvider>
  );
}
