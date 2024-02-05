import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CreateMonthlyGoalForm = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields(); // Reset form fields after submission
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Create Monthly Goal"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          loading={loading}
          type="primary"
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form}>
        <div className="my-2">
          <label htmlFor="month">Month</label>
          <Form.Item
            name="month"
            rules={[{ required: true, message: "Please enter the month!" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateMonthlyGoalForm;
