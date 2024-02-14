import React from "react";
import { Card } from "antd";

const NoteCard = ({ note }) => {
  const cardStyle = {
    backgroundColor: note.color,
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    padding: "12px",
    width: "300px",
  };

  return (
    <div className="mb-4 mx-2 ">
      <Card style={cardStyle} className=" text-balance break-words" hoverable>
        <h3 className="text-lg font-bold mb-2">{note.title}</h3>
        <p className="text-sm ">{note.content}</p>
      </Card>
    </div>
  );
};

export default NoteCard;
