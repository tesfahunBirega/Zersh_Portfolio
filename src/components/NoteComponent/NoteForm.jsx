// components/NoteForm.js
import React, { useState } from "react";
import { Input, Button, Select, Modal } from "antd";
const { Option } = Select;

const NoteForm = ({ addNote, visble }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleAddNote = () => {
    if (title && content && category) {
      addNote({
        id: Math.floor(Math.random() * 1000),
        title,
        content,
        category,
      });
      setTitle("");
      setContent("");
      setCategory("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Modal onCancel={() => {}} onOk={() => {}} open={visble}>
      <div className="mb-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2"
        />
        <Input.TextArea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoSize={{ minRows: 3 }}
          className="mb-2"
        />
        <Select
          placeholder="Category"
          value={category}
          onChange={(value) => setCategory(value)}
          className="w-full mb-2"
        >
          <Option value="Work">Work</Option>
          <Option value="Personal">Personal</Option>
          <Option value="Study">Study</Option>
        </Select>
        <Button type="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </div>
    </Modal>
  );
};

export default NoteForm;
