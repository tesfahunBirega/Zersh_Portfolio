import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input } from "antd";

const { Column } = Table;

const Okr = () => {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch goals data from backend API and set it to goals state
    // Example:
    // fetchGoalsData().then(data => setGoals(data));
  }, []); // Empty dependency array to run the effect only once on mount

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Submit form data to backend API to create new goal
      // Example:
      // createGoal(values).then(newGoal => {
      //   setGoals([...goals, newGoal]);
      // });
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Goals Management</h1>
      <Button type="primary" onClick={showModal} className=" mb-4">
        Add Goal
      </Button>
      <Modal
        title="Add Goal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Goal Name"
            rules={[{ required: true, message: "Please enter goal name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={goals} rowKey="_id">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        {/* Add more columns for other fields */}
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Button type="danger" onClick={() => handleDelete(record._id)}>
              Delete
            </Button>
          )}
        />
      </Table>
    </div>
  );
};

export default Okr;
