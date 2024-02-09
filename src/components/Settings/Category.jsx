import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  Button,
  message,
  Select,
} from "antd";

import { connect } from "react-redux";
import {
  createCatagory,
  deleteCatagory,
  fetchCatagories,
  updateCatagory,
} from "../../store/catagory/catagoryyAction";

const CategoryComponent = ({
  categories,
  loading,
  error,
  fetchCategories,
  createCatagory,
  updateCategory,
  deleteCategory,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  console.log(categories, "categories");
  useEffect(() => {
    fetchCategories();
  }, []);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values, "values");
    createCatagory(values);
    setIsModalVisible(false);
    // message.success("Category created successfully");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePageChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    fetchCategories({
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleUpdate = async (record) => {
    try {
      const values = await form.validateFields();
      updateCategory(record._id, values);
      message.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category: ", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      deleteCategory(categoryId);
      message.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  //the columns

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: "Please select the category type!" },
            ]}
          >
            <Select>
              <Select.Option value="finance">Finance</Select.Option>
              <Select.Option value="blog">Blog</Select.Option>
              <Select.Option value="notes">Notes</Select.Option>
              <Select.Option value="accounting">Accounting</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        pagination={pagination}
        onChange={handlePageChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.catagories.catagories,
    loading: state.catagories.loading,
    error: state.catagories.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (params) => dispatch(fetchCatagories(params)),
    createCatagory: (categoryData) => dispatch(createCatagory(categoryData)),
    updateCategory: (categoryId, categoryData) =>
      dispatch(updateCatagory(categoryId, categoryData)),
    deleteCategory: (categoryId) => dispatch(deleteCatagory(categoryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
