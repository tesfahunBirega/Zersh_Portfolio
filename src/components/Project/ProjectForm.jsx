import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import axios from "axios";
import { baseUrl, getRandomColor } from "../../constants";
import * as z from "zod";

const projectSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  description1: z.string(),
  description2: z.string(),
  topics: z.string().nonempty("At least one topic is required"),
  gitHubLink: z.string().url().optional(),
  projectLink: z.string().url().optional(),
});

function ProjectForm({ visible, setVisible, loading, onSubmit, onCancel }) {
  const [topics, setTopics] = useState([]);
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [descImageUrl1, setDescImageUrl1] = useState("");
  const [descImageUrl2, setDescImageUrl2] = useState("");

  const handleImageChange = async (e, setImageUrlCallback) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      uploadSingleImage(base64, setImageUrlCallback);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64, setImageUrlCallback) => {
    setUploading(true);
    try {
      const response = await axios.post(`${baseUrl}/upload-image`, { image: base64 });
      setImageUrlCallback(response.data.imageUrl);
      message.success("Image uploaded successfully");
    } catch (error) {
      message.error("Error uploading image");
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const parsedValues = projectSchema.parse(values);

      if (parsedValues.projectLink && !parsedValues.projectLink.startsWith("https://")) {
        parsedValues.projectLink = "https://" + parsedValues.projectLink;
      }
      if (parsedValues.gitHubLink && !parsedValues.gitHubLink.startsWith("https://")) {
        parsedValues.gitHubLink = "https://" + parsedValues.gitHubLink;
      }
      onSubmit({ ...parsedValues, imageUrl, descImageUrl1, descImageUrl2, topics });
      setVisible(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorFields = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = { value: form.getFieldValue(err.path[0]), errors: [new Error(err.message)] };
          return acc;
        }, {});
        form.setFields(errorFields);
      } else {
        console.error("Validation failed:", error);
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleTopicsChange = (event) => {
    const topicsInput = event.target.value;
    const topicsArray = topicsInput.split(",").map((topic) => {
      return {
        name: topic.trim(),
        color: getRandomColor(),
      };
    });
    setTopics(topicsArray);
  };

  return (
    <Modal
      title="Add Project"
      open={visible}
      width={"60%"}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          loading={uploading}
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
          <div>
            <label htmlFor="category">Main Image</label>
            <Form.Item name="image" rules={[{ required: true }]}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setImageUrl)}
              />
            </Form.Item>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
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
        <div className="my-4 space-y-4">
  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
    <div className="w-full md:w-1/2">
      <Form.Item name="description1" rules={[{ required: false }]}>
        <Input.TextArea rows={2} />
      </Form.Item>
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <label htmlFor="descImage1" className="mb-1">Description Image 1</label>
      <Form.Item name="descImage1" rules={[{ required: false }]}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setDescImageUrl1)}
        />
      </Form.Item>
      {descImageUrl1 && (
        <img
          src={descImageUrl1}
          alt="Uploaded"
          className="mt-2 rounded-lg"
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  </div>

  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
    <div className="w-full md:w-1/2">
      <Form.Item name="description2" rules={[{ required: false }]}>
        <Input.TextArea rows={2} />
      </Form.Item>
    </div>
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <label htmlFor="descImage2" className="mb-1">Description Image 2</label>
      <Form.Item name="descImage2" rules={[{ required: true }]}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setDescImageUrl2)}
        />
      </Form.Item>
      {descImageUrl2 && (
        <img
          src={descImageUrl2}
          alt="Uploaded"
          className="mt-2 rounded-lg"
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  </div>
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
          <Form.Item name="gitHubLink" rules={[{ type: "url", required: false }]}>
            <Input addonBefore="https://" />
          </Form.Item>
        </div>
        <div className="my-2">
          <label htmlFor="body">Project Link</label>
          <Form.Item name="projectLink" rules={[{ type: "url", required: false }]}>
            <Input addonBefore="https://" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default ProjectForm;
