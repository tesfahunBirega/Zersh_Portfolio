import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const UpdateBlogModal = ({ blog, visible, onUpdate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onUpdate({ ...values, image: imageFile });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.originFileObj) {
      setImageFile(info.file.originFileObj);
    }
  };

  console.log(imageFile, "imageFile");

  return (
    <Modal
      title="Update Blog"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} initialValues={blog}>
        <div className="my-2">
          <label htmlFor="body">Title</label>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="body">Author</label>
          <Form.Item name="author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="description">Description</label>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
        <div className="">
          <label htmlFor="body">Body</label>
          <Form.Item name="body" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>
        <div className="">
          <label htmlFor="category">Category</label>
          <Form.Item name="category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="">
          <label htmlFor="category">Image</label>
          <Form.Item name="image" rules={[{ required: true }]}>
            <Upload
              customRequest={() => {}}
              showUploadList={false}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateBlogModal;
