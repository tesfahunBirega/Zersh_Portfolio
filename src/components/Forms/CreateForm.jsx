import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateBlogModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  width = "50%",
  setVisible,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onCreate({ ...values, image: imageFile, body: content });
      setTimeout(() => {
        setVisible((prev) => !prev);
      }, 3000);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Modal
      title="Create Blog"
      open={visible}
      onCancel={onCancel}
      width={width}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          loading={loading}
          style={{
            className: "bg-gray-500 hover:bg-gray-800",
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} encType="multipart/form-data">
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
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
            />
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
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
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

export default CreateBlogModal;
