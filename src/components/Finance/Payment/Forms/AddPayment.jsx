// components/AddPayment.js
import React, { useEffect, useState } from "react";
import { Input, Button, Select, Modal } from "antd";
const { Option } = Select;

const AddPayment = ({ createPayment, visible, setVisible, categories }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleAddPayment = () => {
    if (name && amount && category ) {
      createPayment({
        name,
        amount,
        description,
        categoryId:category,
      });
      setName("");
      setAmount("");
      setDescription("");
      setCategory("");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Modal
      title={"Add Payment"}
      onCancel={() => setVisible(false)}
      onOk={handleAddPayment}
      open={visible}
    >
      <div className={`mb-4 mt-8`}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2"
        />
        <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 3 }}
          placeholder="Description"
          type="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2"
        />
        <Select
          placeholder="Category"
          value={category}
          onChange={(value) => setCategory(value)}
          className="w-full mb-2"
        >
          {categories
            ?.filter((item) => item?.type === "payment")
            .map((item, index) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </Modal>
  );
};

export default AddPayment;
