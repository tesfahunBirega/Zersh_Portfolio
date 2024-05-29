
import React, { useState } from 'react';
import { Modal, Input, Button, Select } from 'antd';
import useTimerStore from '../../../store/zustand/timerStore';

const { Option } = Select;

const TaskAddModal = ({ modalVisible, setModalVisible , type ,day}) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskBatches, setNewTaskBatches] = useState(1);

  const addTask = useTimerStore((state) => state.addTask);

  const handleOk = () => {
    if (newTaskName.trim() !== '') {
      addTask({
        id: Math.floor(Math.random() * 1000) + 1,
        name: newTaskName,
        batches: newTaskBatches,
        status: 'created',
        timerId: null,
        productiveTime: 0,
        wastedTime: 0,
        duration: newTaskBatches * (30 * 60),
        type:type,
        day:day
      });
      setModalVisible(false);
      setNewTaskName('');
      setNewTaskBatches(1);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setNewTaskName('');
    setNewTaskBatches(1);
  };

  return (
    <Modal
      title="Add Task"
      open={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Task Name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Select
        placeholder="Select number of batches"
        value={newTaskBatches}
        onChange={(value) => setNewTaskBatches(value)}
        style={{ width: '100%' }}
      >
        {[1, 2, 3, 4, 5].map((batch) => (
          <Option key={batch} value={batch}>
            {batch}
          </Option>
        ))}
      </Select>
    </Modal>
  );
};

export default TaskAddModal;
