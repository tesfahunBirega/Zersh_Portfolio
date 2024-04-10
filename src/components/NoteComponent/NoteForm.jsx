// components/NoteForm.js
import React, { useEffect, useState } from "react";
import { Input, Button, Select, Modal } from "antd";
import { generateRandomHexColor } from "../../utils/randomColor";
const { Option } = Select;

const NoteForm = ({ addNote, visble, setVisble, catagories }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setColor(generateRandomHexColor);
  }, [title || content || category]);
  const handleAddNote = () => {
    if (title && content && category) {
      addNote({
        id: Math.floor(Math.random() * 1000),
        title,
        content,
        color,
        category,
      });
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <Modal
      title={"Create Note"}
      onCancel={() => setVisble((prev) => !prev)}
      onOk={handleAddNote}
      open={visble}
      style={{ backgroundColor: color }}
      okButtonProps={{
        className: "bg-gray-500 hover:gray-800 border rounded-xl",
      }}
    >
      <div className={`mb-4 mt-8`}>
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
          {catagories
            ?.filter((item) => item?.type == "notes")
            .map((item, index) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </Modal>
  );
};

export default NoteForm;
