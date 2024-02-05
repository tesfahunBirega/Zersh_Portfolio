import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CreateDailyGoalForm = ({ visible, onCreate, onCancel, loading }) => {
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
      title="Create Daily Goal"
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
          <label htmlFor="day">Day</label>
          <Form.Item
            name="day"
            rules={[{ required: true, message: "Please enter the day!" }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateDailyGoalForm;
