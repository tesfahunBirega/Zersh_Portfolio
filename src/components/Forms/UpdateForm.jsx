import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const UpdateBlogModal = ({ blog, visible, onUpdate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.url); // Set the image URL directly
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

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
              listType="picture-card"
              showUploadList={false}
              onChange={handleImageUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateBlogModal;
