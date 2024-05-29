

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { imgBaseUrl } from "../../constants";

const UpdateBlogModal = ({
  blog,
  visible,
  onUpdate,
  onCancel,
  loading,
  width = "50%",
  setVisible,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  useEffect(()=> {
    if (blog?.imageUrl) {
      fetch( `${imgBaseUrl}${blog?.imageUrl}`)
        .then((res) => res.blob())
        .then((blob) => 
        {
           console.log("blob",blob);
        setImageFile(blob)
        }
      )
      .catch((error) => console.error("Error fetching image:", error));
    }
  },[])

  useEffect(() => {
    if (blog) {
     
      form.setFieldsValue({
        title: blog.title,
        author: blog.author,
        description: blog.description,
        body: blog.body,
        category: blog.category,
        image: imageFile,
      });
      setContent(blog.body);
     
    }
  }, [blog, form, imgBaseUrl]);

  console.log(blog?.imageUrl, imageFile,"imageFile");

  const handleSubmit = async () => {
    try {
      const values = await form.getFieldValue();
      onUpdate({ id:blog._id ,blogData: { ...values, image: imageFile, body: content }  });
      // setTimeout(() => {
      //   setVisible((prev) => !prev);
      // }, 3000);
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
      title="Update Blog"
      open={visible}
      onCancel={onCancel}
      width={width}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          loading={loading}
          onClick={handleSubmit}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} encType="multipart/form-data">
        <div className="my-2">
          <label htmlFor="title">Title</label>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="author">Author</label>
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
          <label htmlFor="imageUrl">Image URL</label>
          <Form.Item name="imageUrl" rules={[{ required: true }]}>
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
              // alt="Selected"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateBlogModal;
