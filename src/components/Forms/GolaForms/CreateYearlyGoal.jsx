import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CreateYearlyGoalForm = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Create Yearly Goal"
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
          <label htmlFor="year">Year</label>
          <Form.Item
            name="year"
            rules={[{ required: true, message: "Please enter the year!" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateYearlyGoalForm;
