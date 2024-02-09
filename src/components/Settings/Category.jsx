import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button, message } from "antd";
// import axios from "axios";
// import "antd/dist/antd.css";
// import "tailwindcss/tailwind.css";

const { Column } = Table;

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchData = async (page = 1, pageSize = 10) => {
    try {
      //   const response = await axios.get("/api/categories", {
      //     params: { page, pageSize },
      //   });
      //   setCategories(response.data.categories);
      //   setPagination({
      //     ...pagination,
      //     total: response.data.totalCount,
      //     current: page,
      //     pageSize,
      //   });
      console.log("*************");
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.post("/api/categories", values);
      setIsModalVisible(false);
      message.success("Category added successfully");
      fetchData();
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize);
  };

  const handleUpdate = async (record) => {
    try {
      const values = await form.validateFields();
      //   await axios.put(`/api/categories/${record._id}`, values);
      message.success("Category updated successfully");
      fetchData();
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-end">
        <Button type="primary" onClick={showModal}>
          Add Category
        </Button>
      </div>
      <Modal
        title="Add Category"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="category_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={categories}
        rowKey="_id"
        pagination={pagination}
        onChange={handlePageChange}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => handleUpdate(record)}>
                Edit
              </Button>
              <Button type="danger">Delete</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default CategoryComponent;
