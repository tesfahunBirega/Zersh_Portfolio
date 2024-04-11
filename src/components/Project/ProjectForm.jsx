import React, { useState } from "react";
import { Modal, Button, Input,Form, Upload, message, Select  } from "antd";
import { getRandomColor } from "../../constants";

const { Option } = Select;

function ProjectForm({ visible, setVisible, loading, onSubmit  , onCancel}) {
    const [imageFile, setImageFile] = useState(null);
    const [topics, setTopics] = useState([]);
  const [form] = Form.useForm();
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.projectLink && !values.projectLink.startsWith("https://")) {
        values.projectLink = "https://" + values.projectLink;
      }
      if (values.gitHubLink && !values.gitHubLink.startsWith("https://")) {
        values.gitHubLink = "https://" + values.gitHubLink;
      }
      onSubmit({ ...values, image: imageFile , topics });
    //   setTimeout(() => {
    //     setVisible((prev) => !prev);
    //   }, 3000);

    console.log("valuesvaluesvaluesvalues", { ...values, image: imageFile , topics });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleTopicsChange = (event) => {
    const topicsInput = event.target.value;
    const topicsArray = topicsInput.split(",").map(topic  => {
      return {
        name: topic.trim(),
        color: getRandomColor()
      };
    });
    setTopics(topicsArray);
  };
  return (
    <Modal
      title="Add Project"
      open={visible}
      width={"35%"}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
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
<div className="w-full flex justify-center items-center">
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
        </div>
        <div className="my-2">
          <label htmlFor="body">Title</label>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        
        <div className="my-2">
          <label htmlFor="description">Description</label>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </div>

        <div className="my-2">
          <label htmlFor="topics">Tags</label>
          <Form.Item name="topics" rules={[{ required: true }]}>
          <Input
            value={topics.join(", ")}
            onChange={handleTopicsChange}
            placeholder="Enter tags separated by commas"
          />
          </Form.Item>
        </div>
        
        <div className="my-2">
          <label htmlFor="body">Github Link</label>
          <Form.Item name="gitHubLink" rules={[{ required: false }]}>
            <Input  addonBefore="https://"  />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="body">Project Link</label>
          <Form.Item name="projectLink" rules={[{ required: false }]}>
            <Input  addonBefore="https://" />
          </Form.Item>
        </div>
        
      </Form>

    </Modal>
  );
}

export default ProjectForm;
