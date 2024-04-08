import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const UpdateCategoryModal = ({ category, visible, onUpdate, onCancel }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    form.resetFields();
  }, [category]);
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      let data = {id:category._id ,catagoryData: { name: values.name, type: values.type }}
      onUpdate(data);
      form.resetFields()
    } catch (error) {
      console.error("Validation failed:", error);
      form.resetFields()

    }
  };

  return (
    <>
    {category != null  && 
     <Modal
      title="Update category"
      open={visible}
      onCancel={onCancel}
      footer={[
 

<Button key="cancel" onClick={()=>{ onCancel(); form.resetFields() }}>
          Cancel
        </Button>,
        <Button
          key="update"
          onClick={handleSubmit}
            className="hover:text-blue-600 text-blue-500 font-bold  text-center  border" 
        >
          Update
        </Button>
  
        ,
      ]}
    >
      <Form form={form} initialValues={category}>
        <div className="my-2">
          <label htmlFor="name">Name</label>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="type">Type</label>
          <Form.Item name="type" rules={[{ required: true }]}>
          <Select >
         <Select.Option value="finance">Finance</Select.Option>
         <Select.Option value="blog">Blog</Select.Option>
         <Select.Option value="notes">Notes</Select.Option>
         <Select.Option value="accounting">Accounting</Select.Option>
       </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
}
</>

  )
}

export default UpdateCategoryModal;
