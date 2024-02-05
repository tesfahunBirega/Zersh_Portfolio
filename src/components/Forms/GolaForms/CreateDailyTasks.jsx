import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CreateTaskForm = ({ visible, onCreate, onCancel, loading }) => {
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
      title="Create Task"
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
          <label htmlFor="description">Description</label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter the task description!" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="completed">Completed</label>
          <Form.Item name="completed" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTaskForm;
