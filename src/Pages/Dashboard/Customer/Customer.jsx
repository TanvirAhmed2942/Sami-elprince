// import React, { useState } from "react";
// import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

// const originData = Array.from({ length: 100 }).map((_, i) => ({
//   key: i.toString(),
//   name: `Edward ${i}`,
//   age: 32,
//   address: `London Park no. ${i}`,
// }));

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[{ required: true, message: `Please Input ${title}!` }]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const Customer = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState(originData);
//   const [editingKey, setEditingKey] = useState("");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows

//   const isEditing = (record) => record.key === editingKey;

//   const edit = (record) => {
//     form.setFieldsValue({ name: "", age: "", address: "", ...record });
//     setEditingKey(record.key);
//   };

//   const cancel = () => setEditingKey("");

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         newData.splice(index, 1, { ...newData[index], ...row });
//         setData(newData);
//       } else {
//         newData.push(row);
//         setData(newData);
//       }
//       setEditingKey("");
//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys, // Update selected rows
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       width: "25%",
//       editable: true,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       width: "15%",
//       editable: true,
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       width: "40%",
//       editable: true,
//     },
//     {
//       title: "Operation",
//       dataIndex: "operation",
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link
//               onClick={() => save(record.key)}
//               style={{ marginRight: 8 }}
//             >
//               Save
//             </Typography.Link>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link
//             disabled={editingKey !== ""}
//             onClick={() => edit(record)}
//           >
//             Edit
//           </Typography.Link>
//         );
//       },
//     },
//   ];

//   const mergedColumns = columns.map((col) => ({
//     ...col,
//     onCell: (record) =>
//       col.editable
//         ? {
//             inputType: col.dataIndex === "age" ? "number" : "text",
//             dataIndex: col.dataIndex,
//             title: col.title,
//             editing: isEditing(record),
//           }
//         : undefined,
//   }));

//   return (
//     <Form form={form} component={false}>
//       <Table
//         rowSelection={rowSelection} // Add checkboxes
//         components={{ body: { cell: EditableCell } }}
//         bordered
//         dataSource={data}
//         columns={mergedColumns}
//         rowClassName="editable-row"
//         pagination={{ onChange: cancel }}
//       />
//     </Form>
//   );
// };

// export default Customer;

import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
} from "antd";

const originData = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}));

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Customer = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => setEditingKey("");

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        newData.splice(index, 1, { ...newData[index], ...row });
        setData(newData);
      } else {
        newData.push(row);
        setData(newData);
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys, // Update selected rows
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="flex gap-3">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) =>
      col.editable
        ? {
            inputType: col.dataIndex === "age" ? "number" : "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }
        : undefined,
  }));

  return (
    <Form form={form} component={false}>
      <Table
        rowSelection={rowSelection} // Add checkboxes
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{ onChange: cancel }}
      />
    </Form>
  );
};

export default Customer;
