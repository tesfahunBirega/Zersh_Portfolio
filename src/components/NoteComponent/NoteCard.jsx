import React, { useState } from "react";
import { Card , Button , Tooltip, Modal , Space } from "antd";
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import UpdateNote from "./UpdateNote";

const NoteCard = ({ note , onUpdateNote, onDelete , categories}) => {

  const [visible, setVisible] = useState(false);
  const cardStyle = {
    backgroundColor: note.color,
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    padding: "12px",
    width: "300px",
  };

  const handleDelete = () => {
    Modal.confirm({
      title: `Are you sure you want to delete ${note.title}?`,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        danger: true,
        style: {
          backgroundColor: '#ff4d4f', 
          color: '#fff',   
          hoverable: true
        },
      },
      onOk() {
        onDelete(note._id);
      },
    });
  };

  return (
    <div className="mb-4 mx-2 ">
      <Card style={cardStyle} className=" text-balance break-words" hoverable>
      <Space style={{ position: 'absolute', top: 0, right: 0, paddingTop: '10px', paddingRight: '10px' }}>
        <Tooltip title="Edit">
          <Button type="primary" shape="circle" icon={<EditOutlined  />} onClick={() => setVisible(true)} />
        </Tooltip>
        <Tooltip title="Delete">
          <Button type="danger" shape="circle" icon={<DeleteFilled className="text-red-600 hover:text-red-800" />} onClick={handleDelete} />
        </Tooltip>
      </Space>
        <h3 className="text-lg font-bold mb-2">{note.title}</h3>
        <p className="text-sm ">{note.content}</p>
      </Card>

      <UpdateNote
        updateNote={onUpdateNote}
        visible={visible}
        setVisible={setVisible}
        categories={categories} 
        currentNote={note}
      />
    </div>
  );
};

export default NoteCard;
