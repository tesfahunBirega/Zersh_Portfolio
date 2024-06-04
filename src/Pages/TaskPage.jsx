import React, { useEffect, useState } from 'react';
import { Button, List, Card, Typography, Descriptions, Divider } from 'antd';
import moment from 'moment';
import Dashboard from '../commons/Dashboard';
import DisplayTime from '../components/Tasks/displayTime';
import { CurrentDayOfYearCard } from '../components/Tasks/Cards/todayCard';
import { WastedTimeCard } from '../components/Tasks/Cards/wastedTime';
import { ProductiveTimeCard } from '../components/Tasks/Cards/ProductiveTimeCard';
import TaskAddModal from '../components/Tasks/Modals/TaskAdd';
import useTimerStore from '../store/zustand/timerStore';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import DynamicTabs from '../components/Commons/DynamicTabs';
import TimeButton from '../components/Tasks/TimeButton';

const { Text } = Typography;

const Tab = ({ children }) => {
  return <div className='w-full h-full'>{children}</div>;
};

const TaskManager = () => {
  const tasks = useTimerStore((state) => state.tasks);
  const timers = useTimerStore((state) => state.timers);
  const startTimer = useTimerStore((state) => state.startTimer);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const pauseTimer = useTimerStore((state) => state.pauseTimer);
  const resumeTimer= useTimerStore((state) => state.resumeTimer)
  const fetchTasks = useTimerStore((state) => state.fetchTasks);
  const complateTask = useTimerStore((state) => state.completeTask)
  const productiveTime = useTimerStore((state) => state.productiveTime);
  const wastedTime = useTimerStore((state) => state.wastedTime);
  const [modalVisible, setModalVisible] = useState(false);
  const currentDayOfYear = moment().dayOfYear();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStartButtonClick = (taskId, duration) => {
    startTimer(taskId, duration);
  };

  const renderTasks = (taskList) => {
    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          style={{
            width: "100%"
          }}
          dataSource={taskList}
          renderItem={(task) => {
            const timer = timers[task._id] || { remaining: task.duration * 60, isRunning: false };

            const hours = Math.floor(timer.remaining / 3600);
            const minutes = Math.floor((timer.remaining % 3600) / 60);
            const seconds = timer.remaining % 60;

            return (
              <List.Item
                key={task.id}
                extra={
                  <div className="grid justify-center items-center gap-4">
                    <DisplayTime duration={task.duration} />                    
                  {task.status == "complete" ? <div className='text-white font-bold flex justify-center items-center'>Task Complated</div>: <TimeButton
                   status={
                     task.status === 'active' ? 0 :
                     task.status === 'paused' ? 1 :
                     task.status === 'reset' ? 2 :
                     task.status === 'resume' ? 3 :
                     task.status === 'created' ? 4 :
                     task.status === 'complete' ? 5 :
                     null
                   }
                   hours={hours}
                   minutes={minutes}
                   seconds={seconds}
                   isRunning={timer.isRunning}
                   resume={() => resumeTimer(task._id)}
                   reset={() => stopTimer(task._id)}
                   pause={() => pauseTimer(task._id)}
                   start={() => handleStartButtonClick(task._id, task.duration)}
                   complete={() => complateTask(task._id)}
                 /> }
                  </div>
                }
              >
                <List.Item.Meta
                  title={<span className='text-white font-bold text-sm'>{task.name}</span>}
                  description={
                    <div className="flex justify-start items-center gap-4">
                      <Card title="Number Batches" size="small">
                        <Text>{task.batches} {task.batches > 1 ? 'Batches' : 'Batch'}</Text>
                      </Card>
                      <Card title="Total Duration" size="small">
                        <Text>{(task.duration / 60).toFixed(2)} Minutes</Text>
                      </Card>
                      <Card title="Productive Time" size="small">
                        <Text>
                          <ClockCircleOutlined /> {moment.utc(moment.duration(task.productiveTime, 'seconds').asMilliseconds()).format('m:ss')} Min
                        </Text>
                      </Card>
                      <Card title="Wasted Time" size="small">
                        <Text>
                          <CloseCircleOutlined /> {moment.utc(moment.duration(task.wastedTime, 'seconds').asMilliseconds()).format('m:ss')} Min
                        </Text>
                      </Card>
                      <Card title="Countdown Time" size="small">
                        <Text>
                          <CloseCircleOutlined /> {task.countDown >= 0
                            ? `${Math.floor(task.countDown / 60)} Minutes`
                            : '0 Minutes'}
                        </Text>
                      </Card>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
        <Divider />
      </>
    );
  };

  return (
    <Dashboard>
      <DynamicTabs>
        <Tab tabName="Daily Tasks">
          <div className="flex justify-start items-center gap-4">
            <CurrentDayOfYearCard currentDayOfYear={currentDayOfYear} />
            <ProductiveTimeCard productiveTime={productiveTime} />
            <WastedTimeCard wastedTime={wastedTime} />
            <Card title="Card" style={{ width: 300 }} />
            <Card title="Card" style={{ width: 300 }} />
          </div>

          <div className="flex" style={{ width: '100%' }}>
            <div className="m-4" style={{ width: 'calc(100% - 50px)' }}>
              <Button type="primary" onClick={() => setModalVisible(true)}>
                Add Task
              </Button>
              <TaskAddModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                type={"daily"}
                day={currentDayOfYear}
              />
              {renderTasks(tasks.daily || [])}
            </div>
          </div>
        </Tab>
        <Tab tabName="Weekly Tasks">
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
                Add Weekly Tasks
              </Button>
              <TaskAddModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                type={"weekly"}
                day={currentDayOfYear}
              />
              {renderTasks(tasks.weekly || [])}
            </div>
          </div>
        </Tab>
        <Tab tabName="Monthly Tasks">
          {renderTasks(tasks.monthly || [])}
        </Tab>
        <Tab tabName="Quarterly Tasks">
          {renderTasks(tasks.quarterly || [])}
        </Tab>
        <Tab tabName="Yearly Tasks">
          {renderTasks(tasks.yearly || [])}
        </Tab>
      </DynamicTabs>
      <Divider />
    </Dashboard>
  );
};

export default TaskManager;
