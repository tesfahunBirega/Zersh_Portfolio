import React, { useState } from "react";
import { Input, Button, Select, Modal } from "antd";
const { Option } = Select;

const UpdatePayment = ({ payment, categories, updatePayment, visible, setVisible }) => {
  const [name, setName] = useState(payment.name);
  const [amount, setAmount] = useState(payment.amount.toString());
  const [category, setCategory] = useState(payment?.category?._id);
  const [description, setDescription] = useState(payment.description || "");
  const [error, setError] = useState(null);

  const handleUpdatePayment = () => {
    if (name && amount && category) {
        const id = payment._id
        const paymentData= {
        name,
        amount: parseFloat(amount),
        description,
        categoryId: category,
        }
      updatePayment(
        {id,paymentData}
      );
      setName("");
      setAmount("");
      setDescription("");
      setCategory("");
      setError(null); 
      setVisible(false); 
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Modal
      title="Update Payment"
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={handleUpdatePayment}
    >
      <div className="mb-4 mt-8">
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
            .map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </Modal>
  );
};

export default UpdatePayment;
