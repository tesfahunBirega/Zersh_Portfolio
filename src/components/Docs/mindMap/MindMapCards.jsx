import React from 'react';
import { Card, Typography, Button, Row, Col, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const MindmapCards = ({ mindmaps, handleMindmapSelect, handleMindmapDelete }) => {
  return (
    <div className="flex overflow-x-scroll scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <Row gutter={16}>
        {mindmaps.map((mindmap) => (
          <Col key={mindmap._id} style={{ minWidth: 200, minHeight: 200, margin: 8 }}>
            <Card
              hoverable
              onClick={() => handleMindmapSelect(mindmap)}
              actions={[
                <Popconfirm
                  title="Are you sure to delete this mindmap?"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    handleMindmapDelete(mindmap._id);
                  }}
                  onCancel={(e) => e.stopPropagation()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />} 
                    onClick={(e) => e.stopPropagation()}
                  />
                </Popconfirm>
              ]}
            >
              <Typography.Title level={5}>
                {mindmap.name || "Untitled Mindmap"}
              </Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MindmapCards;
