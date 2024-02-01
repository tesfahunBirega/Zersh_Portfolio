import React from "react";
import { Card } from "antd";

const NoteCard = ({ note }) => {
  const cardStyle = {
    backgroundColor: note.color,
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    cursor: "pointer",
    marginBottom: "16px",
    padding: "12px",
    transition: "box-shadow 0.3s ease-in-out",
    width: "300px",
  };

  return (
    <Card style={cardStyle} hoverable>
      <h3 style={{ marginBottom: "8px", fontSize: "18px", fontWeight: "bold" }}>
        {note.title}
      </h3>
      <p style={{ fontSize: "14px", marginBottom: "12px" }}>{note.content}</p>
    </Card>
  );
};

export default NoteCard;
