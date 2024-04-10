import React, { useState, useEffect } from "react";
import { Input, Button, Select, Modal } from "antd";
import { generateRandomHexColor } from "../../utils/randomColor";
const { Option } = Select;

const UpdateNote = ({ updateNote, visible, setVisible, categories, currentNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCategory(currentNote.category);
      setColor(currentNote.color);
    }
  }, [currentNote]);

  useEffect(() => {
    setColor(generateRandomHexColor());
  }, [title, content, category]);

  const handleUpdateNote = () => {
    if (title && content && category) {
        let data = {
            id : currentNote._id ,
            noteData : {
                ...currentNote,
                title,
                content,
                category,
                color,
              }
            }
       
      updateNote(data);
      setVisible(false);
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Modal
      title="Update Note"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdateNote}>
          Update
        </Button>,
      ]}
    >
      <div className="mb-4 mt-8">
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
          {categories
            ?.filter((item) => item.type === "notes")
            .map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </Modal>
  );
};

export default UpdateNote;
