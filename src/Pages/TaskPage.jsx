import React, { useState } from 'react';
import { Button, List, Card, Typography, Descriptions, Divider } from 'antd';
import moment from 'moment';
import { motion } from 'framer-motion';
import Dashboard from '../commons/Dashboard';
import DisplayTime from '../components/Tasks/displayTime';
import TimeButton from '../components/Tasks/timeButton';
import { CurrentDayOfYearCard } from '../components/Tasks/Cards/todayCard';
import { WastedTimeCard } from '../components/Tasks/Cards/wastedTime';
import { ProductiveTimeCard } from '../components/Tasks/Cards/ProductiveTimeCard';
import TaskAddModal from '../components/Tasks/Modals/TaskAdd';
import useTimerStore from '../store/zustand/timerStore';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const { Text } = Typography;

const TaskManager = () => {
  const tasks = useTimerStore((state) => state.tasks);
  const timers = useTimerStore((state) => state.timers);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);
  const completeTask = useTimerStore((state) => state.completeTask);
  const productiveTime =  useTimerStore((state) => state.productiveTime);
  const wastedTime = useTimerStore((state) => state.wastedTime);
  const [modalVisible, setModalVisible] = useState(false);
  const currentDayOfYear = moment().dayOfYear();

  const handleStartButtonClick = (taskId, duration) => {
    startTimer(taskId, duration);
  };

  const renderTasks = () => {
    return (
      <>
    <Divider />

       <List
        itemLayout="vertical"
        size="large"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            extra={
              <div className="grid justify-center items-center gap-4">
                <DisplayTime duration={task.duration} />
                <TimeButton
                  status={
                    task.status === 'active' ? 0 :
                    task.status === 'paused' ? 1:
                    task.status === 'reset' ? 2:
                    task.status === 'resume' ? 3:
                    task.status === 'created' ? 4:
                    null}
                  resume={() => startTimer(task.id, timers[task.id])}
                  reset={() => stopTimer(task.id)}
                  pause={() => pauseTimer(task.id)}
                  start={() => handleStartButtonClick(task.id, task.duration)}
                />

                {
                   task.status !== 'completed' && (
                    <Button
                      onClick={() => completeTask(task.id)}
                      type="primary"
                      disabled={task.status !== 'active'}
                    >
                      Complete
                    </Button>
                  )
                }
              </div>
            }
          >
            <List.Item.Meta
  title={<span>{task.name}</span>}
  description={
    <div className="flex justify-start items-center gap-4">
    <Card title="Number Batches" size="small">
      <Text>{task.batches} {task.batches > 1 ? 'Batches' : 'Batch'}</Text>
    </Card>
    <Card title="Total Duration" size="small">
      <Text>{task.duration} Seconds</Text>
    </Card>
    <Card  title="Productive Time" size="small">
      <Text>
        <ClockCircleOutlined /> {task.productiveTime} seconds
      </Text>
    </Card>
    <Card title="Wasted Time" size="small">
      <Text>
        <CloseCircleOutlined /> {task.wastedTime} seconds
      </Text>
    </Card>
    <Card title="Countdown Time" size="small">
      <Text>
        <CloseCircleOutlined /> {task.countDown} seconds
      </Text>
    </Card>

  </div>
  }
/>
          </List.Item>
        )}
      />
    <Divider />


      </>
     
    );
  };

  return (
    <Dashboard>
      <div className="flex justify-start items-center gap-4">
        <CurrentDayOfYearCard currentDayOfYear={currentDayOfYear} />
        <ProductiveTimeCard productiveTime={productiveTime} />
        <WastedTimeCard wastedTime={wastedTime} />
        <Card title="Card" style={{ width: 300 }} />
        <Card title="Card" style={{ width: 300 }} />
      </div>

      <div className="flex" style={{ width: '100%' }}>
        <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Add Task
          </Button>
          <TaskAddModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            
          />
          {renderTasks()}
        </div>
        <div>
          <h3>Productive Time: {productiveTime} seconds</h3>
          <h3>Wasted Time: {wastedTime} seconds</h3>
        </div>
      </div>
    </Dashboard>
  );
};

export default TaskManager;
