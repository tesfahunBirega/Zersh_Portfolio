import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
import UpdateCategoryModal from "../Forms/CatagoryForms/inxed";

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
  const [showUpdateModal, setShowUpdateModal] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);


  console.log(showUpdateModal , "showUpdateModal");
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values, "values");
    createCatagory(values);
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

  const handleDelete = async (categoryId) => {
    try {
      Modal.confirm({
        title: 'Are you sure you want to delete?',
        okText: 'Yes',
        cancelText: 'No',
        okButtonProps: {
          danger: true,
          style: {
            backgroundColor: '#ff4d4f', 
            color: '#fff',          },
        },
        onOk: () => {
          deleteCategory(categoryId);
        },
      });
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };


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
        <div className="flex justify-start">
           <Space size="middle">
        <Button 
           className=" hover:text-blue-800 text-blue-500 font-bold py-2 px-4 flex items-center " 
           onClick={() => setShowUpdateModal(record)}>
          <EditOutlined 
          size={24}/>
          </Button>
          <Button 
           style={{
             backgroundColor: '#ff4d4f',
             color: '#fff', 
             borderRadius: '4px', 
             padding: '8px 16px', 
             cursor: 'pointer', 
             fontWeight: 'bold',
           }}
            className="flex items-center"
           onClick={() => handleDelete(record._id)}>
          <DeleteOutlined  size={24}/>
          </Button>
        </Space>
        </div>
       
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-end">
        <Button
          style={{
            className: "text-gray-500 bg-gray-200",
          }}
          onClick={showModal}
        >
          Add Category
        </Button>
      </div>
      <Modal
        title="Add Category"
        open={isModalVisible}
        onOk={handleOk}
        okButtonProps={{
          className:"hover:text-red-600 text-red-500 font-bold py-2 px-4 text-center " 
        }}
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
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="payment">Payment</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <UpdateCategoryModal 
      category={showUpdateModal}
      onCancel={()=>setShowUpdateModal(null)}
      onUpdate={updateCategory}
      visible={ !updateCatagory ? false : true }
      />
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
    updateCategory: (data) => dispatch(updateCatagory(data)),
    deleteCategory: (categoryId) => dispatch(deleteCatagory(categoryId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
