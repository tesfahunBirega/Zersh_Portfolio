import React, { useState } from 'react';
import { Checkbox, Input, Button, Modal, Select, List } from 'antd';
import moment from 'moment';
import Dashboard from '../commons/Dashboard';

const { Option } = Select;

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { name: 'Task 1', description: 'Description of Task 1', achieved: false, time: moment('06:30', 'HH:mm') },
    { name: 'Task 2', description: 'Description of Task 2', achieved: true, time: moment('07:00', 'HH:mm') },
    // Add more tasks as needed
  ]);

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const startDate = moment('2024-01-01'); // Assuming Day 1 starts from January 1, 2024

  const calculateCurrentDay = () => {
    const currentDate = moment();
    const daysDiff = currentDate.diff(startDate, 'days') + 1;
    return daysDiff;
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].achieved = !updatedTasks[index].achieved;
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskName && newTaskTime) {
      const newTask = {
        name: newTaskName,
        description: '',
        achieved: false,
        time: moment(newTaskTime, 'HH:mm'),
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setNewTaskTime('');
      setModalVisible(false);
    }
  };

  const renderTasks = () => {
    return (
      <List
        dataSource={tasks}
        renderItem={(task, index) => (
          <List.Item key={index} style={{ width: '100%' }}>
            <Checkbox checked={task.achieved} onChange={() => handleCheckboxChange(index)} />
            <div style={{ marginLeft: 16, width: 'calc(100% - 100px)' }}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div style={{ marginLeft: 'auto', width: '100px', textAlign: 'right' }}>{task.time.format('HH:mm')}</div>
          </List.Item>
        )}
      />
    );
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    const startTime = moment('05:30', 'HH:mm');
    const endTime = moment('22:30', 'HH:mm');
    let currentTime = startTime.clone();

    while (currentTime.isBefore(endTime)) {
      // Add work period (25 minutes)
      for (let i = 0; i < 5; i++) {
        timeOptions.push(
          <Option key={currentTime.format('HH:mm')} value={currentTime.format('HH:mm')}>
            {currentTime.format('HH:mm')}
          </Option>
        );
        currentTime.add(5, 'minutes');
      }

      // Add rest period (5 minutes)
      currentTime.add(5, 'minutes');
    }
    return timeOptions;
  };

  return (
    <Dashboard>
      <h2>Day {calculateCurrentDay()}</h2>

      <div className="flex" style={{ width: '100%' }}>

        <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
          <Modal
            title="Add Task"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
              <Button key="add" type="primary" onClick={handleAddTask}>Add Task</Button>,
            ]}
          >
            <Input placeholder="Task Name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
            <Select
              placeholder="Select Time"
              style={{ width: '100%', marginTop: 10 }}
              value={newTaskTime}
              onChange={(value) => setNewTaskTime(value)}
            >
              {generateTimeOptions()}
            </Select>
          </Modal>
          {renderTasks()}
        </div>
      </div>
    </Dashboard>
  );
};

export default TaskManager;
