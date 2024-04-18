import React, { useState } from "react";
import { Input, Button, Select, Modal } from "antd";
const { Option } = Select;

const UpdateExpense = ({ expense, categories, updateExpense, visible, setVisible }) => {
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category._id);
  const [description, setDescription] = useState(expense.description || "");
  const [error, setError] = useState(null);

  const handleUpdateExpense = () => {
    if (name && amount && category) {
        const id = expense._id
        const expenseData= {
        name,
        amount: parseFloat(amount),
        description,
        categoryId: category,
        }
      updateExpense(
        {id,expenseData}
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
      title="Update Expense"
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={handleUpdateExpense}
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
            ?.filter((item) => item?.type === "expense")
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

export default UpdateExpense;
