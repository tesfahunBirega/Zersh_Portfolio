import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Space, Popconfirm, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchConversations, createConversation, deleteConversation, updateConversation } from '../../../store/conversation/conversationAction';
import ConversationForm from './ConversationForm';

const { Meta } = Card;

const ConversationCard = ({ conversation, onOpen, onUpdate, onDelete }) => {
    const handleOpenUpdateModal = (e) => {
      e.stopPropagation();
      onUpdate(conversation);
    };
  

    const handleDelete = (e) => {
      e.stopPropagation();
      onDelete();
    };
  
    const handleCardClick = () => {
        onOpen(conversation, 'view');
    };
  
    return (
      <div>
        <Space style={{ marginTop: '1rem' }}>
          <Button type="primary" icon={<EditOutlined />} onClick={handleOpenUpdateModal}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this conversation?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
        <Divider />

        <Card
          style={{ marginBottom: '1rem' }}
          className='w-[200px]'
          onClick={handleCardClick}
        >
          <Meta title={conversation?.title} description={conversation?.description} />
        </Card>
        
      </div>
    );
  };
const ConversationPlans = ({
  fetchedConversations,
  fetchConversations,
  createConversation,
  loading,
  updateConversation,
  deleteConversation
}) => {
  const [visibleConversation, setVisibleConversation] = useState(null);
  const [purpose, setPurpose] = useState('');

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleOpenConversation = (conversation, type) => {
    setPurpose(type)
    setVisibleConversation(conversation);
  };

  const handleCloseConversation = () => {
    setVisibleConversation(null);
  };

  const handleAddConversation = (type) => {
    setPurpose(type)
    setVisibleConversation({});
  };
console.log(fetchedConversations ,"fetchedConversations");
  return (
    <div className=''>
      <Button type="primary" onClick={() => handleAddConversation('create')} style={{ marginBottom: 20 }}>
        Add Conversation
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className='flex gap-4'>
        {fetchedConversations.map((conversation, index) => (
          <ConversationCard
            key={index}
            conversation={conversation}
            onOpen={() => handleOpenConversation(conversation, "view")}
            onUpdate={() => handleOpenConversation(conversation, "update")}
            onDelete={() => deleteConversation(conversation._id)}
          />
        ))}
      </div>
      <Modal
        title={visibleConversation ? visibleConversation.title : ''}
        width={"50%"}
        open={!!visibleConversation}
        onCancel={handleCloseConversation}
        footer={null}
      >
        <div className="flex justify-center items-center">
          {visibleConversation && <ConversationForm data={purpose === "view" ? visibleConversation : purpose === "create" ? {} : visibleConversation} onCreate={createConversation} onUpdate={updateConversation} purpose={purpose} />}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedConversations: state.conversations.conversations,
    loading: state.conversations.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => dispatch(fetchConversations()),
    createConversation: (data) => dispatch(createConversation(data)),
    updateConversation: (data) => dispatch(updateConversation(data)),
    deleteConversation: (id) => dispatch(deleteConversation(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationPlans);
