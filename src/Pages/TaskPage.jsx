// import React, { useState } from 'react';
// import { Checkbox, Input, Button, Modal, Select, List } from 'antd';
// import moment from 'moment';
// import Dashboard from '../commons/Dashboard';

// const { Option } = Select;

// const TaskManager = () => {
//   const [tasks, setTasks] = useState([
//     { name: 'Task 1', description: 'Description of Task 1', achieved: false, time: moment('06:30', 'HH:mm') },
//     { name: 'Task 2', description: 'Description of Task 2', achieved: true, time: moment('07:00', 'HH:mm') },
//     // Add more tasks as needed
//   ]);

//   const [newTaskName, setNewTaskName] = useState('');
//   const [newTaskTime, setNewTaskTime] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   const startDate = moment('2024-01-01'); // Assuming Day 1 starts from January 1, 2024

//   const calculateCurrentDay = () => {
//     const currentDate = moment();
//     const daysDiff = currentDate.diff(startDate, 'days') + 1;
//     return daysDiff;
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].achieved = !updatedTasks[index].achieved;
//     setTasks(updatedTasks);
//   };

//   const handleAddTask = () => {
//     if (newTaskName && newTaskTime) {
//       const newTask = {
//         name: newTaskName,
//         description: '',
//         achieved: false,
//         time: moment(newTaskTime, 'HH:mm'),
//       };
//       setTasks([...tasks, newTask]);
//       setNewTaskName('');
//       setNewTaskTime('');
//       setModalVisible(false);
//     }
//   };

//   const renderTasks = () => {
//     return (
//       <List
//         dataSource={tasks}
//         renderItem={(task, index) => (
//           <List.Item key={index} style={{ width: '100%' }}>
//             <Checkbox checked={task.achieved} onChange={() => handleCheckboxChange(index)} />
//             <div style={{ marginLeft: 16, width: 'calc(100% - 100px)' }}>
//               <h3>{task.name}</h3>
//               <p>{task.description}</p>
//             </div>
//             <div style={{ marginLeft: 'auto', width: '100px', textAlign: 'right' }}>{task.time.format('HH:mm')}</div>
//           </List.Item>
//         )}
//       />
//     );
//   };

//   const generateTimeOptions = () => {
//     const timeOptions = [];
//     const startTime = moment('05:30', 'HH:mm');
//     const endTime = moment('22:30', 'HH:mm');
//     let currentTime = startTime.clone();

//     while (currentTime.isBefore(endTime)) {
//       // Add work period (25 minutes)
//       for (let i = 0; i < 5; i++) {
//         timeOptions.push(
//           <Option key={currentTime.format('HH:mm')} value={currentTime.format('HH:mm')}>
//             {currentTime.format('HH:mm')}
//           </Option>
//         );
//         currentTime.add(5, 'minutes');
//       }

//       // Add rest period (5 minutes)
//       currentTime.add(5, 'minutes');
//     }
//     return timeOptions;
//   };

//   return (
//     <Dashboard>
//       <h2>Day {calculateCurrentDay()}</h2>

//       <div className="flex" style={{ width: '100%' }}>

//         <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
//           <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
//           <Modal
//             title="Add Task"
//             open={modalVisible}
//             onCancel={() => setModalVisible(false)}
//             footer={[
//               <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
//               <Button key="add" type="primary" onClick={handleAddTask}>Add Task</Button>,
//             ]}
//           >
//             <Input placeholder="Task Name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
//             <Select
//               placeholder="Select Time"
//               style={{ width: '100%', marginTop: 10 }}
//               value={newTaskTime}
//               onChange={(value) => setNewTaskTime(value)}
//             >
//               {generateTimeOptions()}
//             </Select>
//           </Modal>
//           {renderTasks()}
//         </div>
//       </div>
//     </Dashboard>
//   );
// };

// export default TaskManager;



// import React, { useState, useEffect } from 'react';
// import { Checkbox, Input, Button, Modal, Select, List } from 'antd';
// import moment from 'moment';
// import Dashboard from '../commons/Dashboard';

// const { Option } = Select;

// const TaskManager = () => {
//   // State for tasks
//   const [tasks, setTasks] = useState([]);
  
//   // State for countdown timers
//   const [timers, setTimers] = useState({});

//   // State for productivity tracking
//   const [productiveTime, setProductiveTime] = useState(0);
//   const [wastedTime, setWastedTime] = useState(0);

//   // State for new task modal
//   const [newTaskName, setNewTaskName] = useState('');
//   const [newTaskTime, setNewTaskTime] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   // Calculate current day of the year
//   const currentDayOfYear = moment().dayOfYear();

//   // Function to start a countdown timer for a task
//   const startTimer = (taskId, duration) => {
//     const timerId = setInterval(() => {
//       // Update timer
//       setTimers(prevTimers => ({
//         ...prevTimers,
//         [taskId]: prevTimers[taskId] - 1
//       }));

//       // Update productivity tracking
//       setProductiveTime(prevTime => prevTime + 1);
//     }, 1000);

//     // Store timer ID
//     setTimers(prevTimers => ({
//       ...prevTimers,
//       [taskId]: duration
//     }));

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'active' } : task
//     ));
//   };

//   // Function to stop a countdown timer for a task
//   const stopTimer = (taskId) => {
//     clearInterval(timers[taskId]);

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'paused' } : task
//     ));

//     // Update productivity tracking
//     setWastedTime(prevTime => prevTime + 1);
//   };

//   // Function to add a new task
//   const addTask = (taskName, taskTime) => {
//     const taskId = Math.floor(Math.random() * 1000) + 1;

//     // Update tasks state
//     setTasks(prevTasks => [
//       ...prevTasks,
//       { id: taskId, name: taskName, time: moment(taskTime, 'HH:mm'), status: 'inactive' }
//     ]);

//     // Calculate duration in seconds
//     const durationInSeconds = moment.duration(moment().startOf('day').add(taskTime).diff(moment().startOf('day'))).asSeconds();

//     // Start countdown timer
//     startTimer(taskId, durationInSeconds);
//   };

//   // Function to update productive and wasted time
//   const updateProductivity = () => {
//     const activeTasks = tasks.filter(task => task.status === 'active');
//     activeTasks.forEach(task => {
//       setProductiveTime(prevTime => prevTime + 1);
//     });

//     const pausedTasks = tasks.filter(task => task.status === 'paused');
//     pausedTasks.forEach(task => {
//       setWastedTime(prevTime => prevTime + 1);
//     });
//   };

//   // UseEffect hook to update productivity
//   useEffect(() => {
//     const productivityTimer = setInterval(() => {
//       updateProductivity();
//     }, 1000);

//     return () => clearInterval(productivityTimer);
//   }, [tasks]);

//   const handleCheckboxChange = (taskId) => {
//     if (tasks.find(task => task.id === taskId).status === 'active') {
//       stopTimer(taskId);
//     }
//     else {
//       const taskTime = tasks.find(task => task.id === taskId).time.format('HH:mm');
//       const durationInSeconds = moment.duration(moment().startOf('day').add(taskTime).diff(moment().startOf('day'))).asSeconds();
//       startTimer(taskId, durationInSeconds);
//     }
//   };

//   const generateTimeOptions = () => {
//     const timeOptions = [];
//     const startTime = moment('05:30', 'HH:mm');
//     const endTime = moment('22:30', 'HH:mm');
//     let currentTime = startTime.clone();
  
//     while (currentTime.isBefore(endTime)) {
//       timeOptions.push(
//         <Option key={currentTime.format('HH:mm')} value={currentTime.format('HH:mm')}>
//           {currentTime.format('HH:mm')}
//         </Option>
//       );
//       currentTime.add(30, 'minutes');
//     }
//     return timeOptions;
//   };

//   const renderTasks = () => {
//     return (
//       <List
//         dataSource={tasks}
//         renderItem={task => (
//           <List.Item key={task.id} style={{ width: '100%' }}>
//             <Checkbox 
//               checked={task.status === 'active'} 
//               onChange={() => handleCheckboxChange(task.id)} 
//               disabled={task.status === 'completed'}
//             />
//             <div style={{ marginLeft: 16, width: 'calc(100% - 100px)' }}>
//               <h3>{task.name}</h3>
//               <p>{task.time.format('HH:mm')}</p>
//             </div>
//             {task.status === 'active' && (
//               <div style={{ marginLeft: 'auto', width: '100px', textAlign: 'right' }}>
//                 {formatTime(timers[task.id])}
//               </div>
//             )}
//           </List.Item>
//         )}
//       />
//     );
//   };

//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;

//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   return (
//     <Dashboard>
//       <h2>Day {currentDayOfYear} of the Year</h2>

//       <div className="flex" style={{ width: '100%' }}>
//         <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
//           <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
//           <Modal
//             title="Add Task"
//             visible={modalVisible}
//             onCancel={() => setModalVisible(false)}
//             footer={[
//               <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
//               <Button key="add" type="primary" onClick={() => addTask(newTaskName, newTaskTime)}>Add Task</Button>,
//             ]}
//           >
//             <Input 
//               placeholder="Task Name" 
//               value={newTaskName} 
//               onChange={(e) => setNewTaskName(e.target.value)} 
//               style={{ marginBottom: 10 }} 
//             />
//             <Select
//               placeholder="Select Time"
//               style={{ width: '100%' }}
//               value={newTaskTime}
//               onChange={(value) => setNewTaskTime(value)}
//             >
//               {generateTimeOptions()}
//             </Select>
//           </Modal>
//           {renderTasks()}
//         </div>
//         <div>
//           <h3>Productive Time: {productiveTime} seconds</h3>
//           <h3>Wasted Time: {wastedTime} seconds</h3>
//         </div>
//       </div>
//     </Dashboard>
//   );
// };

// export default TaskManager;

// import React, { useState, useEffect } from 'react';
// import { Checkbox, Input, Button, Modal, Select, List, Typography } from 'antd';
// import moment from 'moment';
// import { motion } from 'framer-motion';
// import Dashboard from '../commons/Dashboard';

// const { Option } = Select;
// const { Text } = Typography;

// const TaskManager = () => {
//   // State for tasks
//   const [tasks, setTasks] = useState([]);
  
//   // State for countdown timers
//   const [timers, setTimers] = useState({});

//   // State for productivity tracking
//   const [productiveTime, setProductiveTime] = useState(0);
//   const [wastedTime, setWastedTime] = useState(0);

//   // State for new task modal
//   const [newTaskName, setNewTaskName] = useState('');
//   const [newTaskTime, setNewTaskTime] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   // Calculate current day of the year
//   const currentDayOfYear = moment().dayOfYear();

//   // Function to start a countdown timer for a task
//   const startTimer = (taskId, duration) => {
//     const timerId = setInterval(() => {
//       // Update timer
//       setTimers(prevTimers => ({
//         ...prevTimers,
//         [taskId]: prevTimers[taskId] - 1
//       }));

//       // Update productivity tracking
//       setProductiveTime(prevTime => prevTime + 1);
//     }, 1000);

//     // Store timer ID
//     setTimers(prevTimers => ({
//       ...prevTimers,
//       [taskId]: duration
//     }));

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'active' } : task
//     ));
//   };

//   // Function to stop a countdown timer for a task
//   const stopTimer = (taskId) => {
//     clearInterval(timers[taskId]);

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'paused' } : task
//     ));

//     // Update productivity tracking
//     setWastedTime(prevTime => prevTime + 1);
//   };

//   // Function to add a new task
//   const addTask = (taskName, taskTime) => {
//     const taskId = Math.floor(Math.random() * 1000) + 1;

//     // Update tasks state
//     setTasks(prevTasks => [
//       ...prevTasks,
//       { id: taskId, name: taskName, time: moment(taskTime, 'HH:mm'), status: 'inactive' }
//     ]);

//     // Calculate duration in seconds
//     const durationInSeconds = moment.duration(moment().startOf('day').add(taskTime).diff(moment().startOf('day'))).asSeconds();

//     // Start countdown timer
//     startTimer(taskId, durationInSeconds);
//   };

//   // Function to update productive and wasted time
//   const updateProductivity = () => {
//     const activeTasks = tasks.filter(task => task.status === 'active');
//     activeTasks.forEach(task => {
//       setProductiveTime(prevTime => prevTime + 1);
//     });

//     const pausedTasks = tasks.filter(task => task.status === 'paused');
//     pausedTasks.forEach(task => {
//       setWastedTime(prevTime => prevTime + 1);
//     });
//   };

//   // UseEffect hook to update productivity
//   useEffect(() => {
//     const productivityTimer = setInterval(() => {
//       updateProductivity();
//     }, 1000);

//     return () => clearInterval(productivityTimer);
//   }, [tasks]);

//   const handleCheckboxChange = (taskId) => {
//     if (tasks.find(task => task.id === taskId).status === 'active') {
//       stopTimer(taskId);
//     }
//     else {
//       const taskTime = tasks.find(task => task.id === taskId).time.format('HH:mm');
//       const durationInSeconds = moment.duration(moment().startOf('day').add(taskTime).diff(moment().startOf('day'))).asSeconds();
//       startTimer(taskId, durationInSeconds);
//     }
//   };

//   const handleTaskCompletion = (taskId) => {
//     clearInterval(timers[taskId]);

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'completed' } : task
//     ));
//   };


//     const generateTimeOptions = () => {
//     const timeOptions = [];
//     const startTime = moment('05:30', 'HH:mm');
//     const endTime = moment('22:30', 'HH:mm');
//     let currentTime = startTime.clone();
  
//     while (currentTime.isBefore(endTime)) {
//       timeOptions.push(
//         <Option key={currentTime.format('HH:mm')} value={currentTime.format('HH:mm')}>
//           {currentTime.format('HH:mm')}
//         </Option>
//       );
//       currentTime.add(30, 'minutes');
//     }
//     return timeOptions;
//   };


//   const renderTasks = () => {
//     return (
//       <List
//         dataSource={tasks}
//         renderItem={task => (
//           <motion.div 
//             key={task.id} 
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             style={{ width: '100%', marginBottom: 10 }}
//           >
//             <Checkbox 
//               checked={task.status === 'active'} 
//               onChange={() => handleCheckboxChange(task.id)} 
//               disabled={task.status === 'completed'}
//             />
//             <div style={{ marginLeft: 16, width: 'calc(100% - 250px)' }}>
//               <h3>{task.name}</h3>
//               <p>Duration: {task.time.format('HH:mm')}</p>
//               {task.status === 'active' && (
//                 <Text>Remaining: {Math.floor(timers[task.id] / 60)} minutes {timers[task.id] % 60} seconds</Text>
//               )}
//             </div>
//             <div style={{ marginLeft: 'auto', width: '250px', textAlign: 'right' }}>
//               {task.status === 'active' ? (
//                 <Button type="primary" danger onClick={() => stopTimer(task.id)}>Stop</Button>
//               ) : (
//                 <Button type="primary" onClick={() => startTimer(task.id, task.time.diff(moment(), 'seconds'))}>Start</Button>
//               )}
//               {!task.status === 'completed' && (
//                 <Button type="primary" onClick={() => handleTaskCompletion(task.id)}>Complete</Button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       />
//     );
//   };

//   return (
//     <Dashboard>
//       <h2>Day {currentDayOfYear} of the Year</h2>

//       <div className="flex" style={{ width: '100%' }}>
//         <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
//           <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
//           <Modal
//             title="Add Task"
//             visible={modalVisible}
//             onCancel={() => setModalVisible(false)}
//             footer={[
//               <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
//               <Button key="add" type="primary" onClick={() => addTask(newTaskName, newTaskTime)}>Add Task</Button>,
//             ]}
//           >
//             <Input 
//               placeholder="Task Name" 
//               value={newTaskName} 
//               onChange={(e) => setNewTaskName(e.target.value)} 
//               style={{ marginBottom: 10 }} 
//             />
//             <Select
//               placeholder="Select Time"
//               style={{ width: '100%' }}
//               value={newTaskTime}
//               onChange={(value) => setNewTaskTime(value)}
//             >
//               {generateTimeOptions()}
//             </Select>
//           </Modal>
//           {renderTasks()}
//         </div>
//         <div>
//           <h3>Productive Time: {productiveTime} seconds</h3>
//           <h3>Wasted Time: {wastedTime} seconds</h3>
//         </div>
//       </div>
//     </Dashboard>
//   );
// };

// export default TaskManager;



// import React, { useState, useEffect } from 'react';
// import { Checkbox, Input, Button, Modal, Select, List, Typography } from 'antd';
// import moment from 'moment';
// import { motion } from 'framer-motion';
// import Dashboard from '../commons/Dashboard';

// const { Option } = Select;
// const { Text } = Typography;

// const TaskManager = () => {
//   // State for tasks
//   const [tasks, setTasks] = useState([]);
  
//   // State for countdown timers
//   const [timers, setTimers] = useState({});

//   // State for productivity tracking
//   const [productiveTime, setProductiveTime] = useState(0);
//   const [wastedTime, setWastedTime] = useState(0);

//   // State for new task modal
//   const [newTaskName, setNewTaskName] = useState('');
//   const [newTaskBatches, setNewTaskBatches] = useState(1); // Default to 1 batch
//   const [modalVisible, setModalVisible] = useState(false);

//   // Calculate current day of the year
//   const currentDayOfYear = moment().dayOfYear();

//   // Function to start a countdown timer for a task
//   const startTimer = (taskId, duration) => {
//     const timerId = setInterval(() => {
//       // Update timer
//       setTimers(prevTimers => ({
//         ...prevTimers,
//         [taskId]: prevTimers[taskId] - 1
//       }));

//       // Update productivity tracking
//       setProductiveTime(prevTime => prevTime + 1);
//     }, 1000);

//     // Store timer ID
//     setTimers(prevTimers => ({
//       ...prevTimers,
//       [taskId]: duration
//     }));

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'active' } : task
//     ));
//   };

//   // Function to stop a countdown timer for a task
//   const stopTimer = (taskId) => {
//     clearInterval(timers[taskId]);

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'paused' } : task
//     ));

//     // Update productivity tracking
//     setWastedTime(prevTime => prevTime + 1);
//   };

//   // Function to add a new task
//   const addTask = (taskName, taskBatches) => {
//     const taskId = Math.floor(Math.random() * 1000) + 1;

//     // Update tasks state
//     setTasks(prevTasks => [
//       ...prevTasks,
//       { id: taskId, name: taskName, batches: taskBatches, status: 'inactive' }
//     ]);

//     // Calculate duration in seconds
//     const durationInSeconds = taskBatches * 30 * 60; // 30 minutes per batch

//     // Start countdown timer
//     startTimer(taskId, durationInSeconds);
//   };

//   // Function to update productive and wasted time
//   const updateProductivity = () => {
//     const activeTasks = tasks.filter(task => task.status === 'active');
//     activeTasks.forEach(task => {
//       setProductiveTime(prevTime => prevTime + 1);
//     });

//     const pausedTasks = tasks.filter(task => task.status === 'paused');
//     pausedTasks.forEach(task => {
//       setWastedTime(prevTime => prevTime + 1);
//     });
//   };

//   // UseEffect hook to update productivity
//   useEffect(() => {
//     const productivityTimer = setInterval(() => {
//       updateProductivity();
//     }, 1000);

//     return () => clearInterval(productivityTimer);
//   }, [tasks]);

//   const handleCheckboxChange = (taskId) => {
//     if (tasks.find(task => task.id === taskId).status === 'active') {
//       stopTimer(taskId);
//     }
//     else {
//       const taskBatches = tasks.find(task => task.id === taskId).batches;
//       const durationInSeconds = taskBatches * 30 * 60; // 30 minutes per batch
//       startTimer(taskId, durationInSeconds);
//     }
//   };

//   const handleTaskCompletion = (taskId) => {
//     clearInterval(timers[taskId]);

//     // Update task status
//     setTasks(prevTasks => prevTasks.map(task => 
//       task.id === taskId ? { ...task, status: 'completed' } : task
//     ));
//   };

//   const renderTasks = () => {
//     return (
//       <List
//         dataSource={tasks}
//         renderItem={task => (
//           <motion.div 
//             key={task.id} 
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             style={{ width: '100%', marginBottom: 10 }}
//           >
//             <Checkbox 
//               checked={task.status === 'active'} 
//               onChange={() => handleCheckboxChange(task.id)} 
//               disabled={task.status === 'completed'}
//             />
//             <div style={{ marginLeft: 16, width: 'calc(100% - 250px)' }}>
//               <h3>{task.name}</h3>
//               <p>Batches: {task.batches}</p>
//               {task.status === 'active' && (
//                 <Text>Remaining: {Math.floor(timers[task.id] / 60)} minutes {timers[task.id] % 60} seconds</Text>
//               )}
//             </div>
//             <div style={{ marginLeft: 'auto', width: '250px', textAlign: 'right' }}>
//               {task.status === 'active' ? (
//                 <Button type="primary" danger onClick={() => stopTimer(task.id)}>Stop</Button>
//               ) : (
//                 <Button type="primary" onClick={() => handleCheckboxChange(task.id)}>Start</Button>
//               )}
//               {!task.status === 'completed' && (
//                 <Button type="primary" onClick={() => handleTaskCompletion(task.id)}>Complete</Button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       />
//     );
//   };

//   return (
//     <Dashboard>
//       <h2>Day {currentDayOfYear} of the Year</h2>

//       <div className="flex" style={{ width: '100%' }}>
//         <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
//           <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
//           <Modal
//             title="Add Task"
//             visible={modalVisible}
//             onCancel={() => setModalVisible(false)}
//             footer={[
//               <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
//               <Button key="add" type="primary" onClick={() => addTask(newTaskName, newTaskBatches)}>Add Task</Button>,
//             ]}
//           >
//             <Input 
//               placeholder="Task Name" 
//               value={newTaskName} 
//               onChange={(e) => setNewTaskName(e.target.value)} 
//               style={{ marginBottom: 10 }} 
//             />
//             <Select
//               placeholder="Select Batches"
//               style={{ width: '100%' }}
//               value={newTaskBatches}
//               onChange={(value) => setNewTaskBatches(value)}
//             >
//               <Option value={1}>1 Batch</Option>
//               <Option value={2}>2 Batches</Option>
//               <Option value={3}>3 Batches</Option>
//               {/* Add more options as needed */}
//             </Select>
//           </Modal>
//           {renderTasks()}
//         </div>
//         <div>
//           <h3>Productive Time: {productiveTime} seconds</h3>
//           <h3>Wasted Time: {wastedTime} seconds</h3>
//         </div>
//       </div>
//     </Dashboard>
//   );
// };

// export default TaskManager;



import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Button, Modal, Select, List, Typography } from 'antd';
import moment from 'moment';
import { motion } from 'framer-motion';
import Dashboard from '../commons/Dashboard';

const { Option } = Select;
const { Text } = Typography;

const TaskManager = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  
  // State for countdown timers
  const [timers, setTimers] = useState({});

  // State for productivity tracking
  const [productiveTime, setProductiveTime] = useState(0);
  const [wastedTime, setWastedTime] = useState(0);

  // State for new task modal
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskBatches, setNewTaskBatches] = useState(1); // Default to 1 batch
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate current day of the year
  const currentDayOfYear = moment().dayOfYear();

  // Function to start a countdown timer for a task
  const startTimer = (taskId, duration) => {
    const timerId = setInterval(() => {
      // Update timer
      setTimers(prevTimers => ({
        ...prevTimers,
        [taskId]: prevTimers[taskId] - 1
      }));

      // Update productivity tracking
      setProductiveTime(prevTime => prevTime + 1);
    }, 1000);

    // Store timer ID
    setTimers(prevTimers => ({
      ...prevTimers,
      [taskId]: duration
    }));

    // Update task status
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, status: 'active' } : task
    ));
  };

  // Function to stop a countdown timer for a task
  const stopTimer = (taskId) => {
    clearInterval(timers[taskId]);

    // Update task status
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, status: 'paused' } : task
    ));

    // Update productivity tracking
    setWastedTime(prevTime => prevTime + 1);
  };

  // Function to add a new task
  const addTask = (taskName, taskBatches) => {
    const taskId = Math.floor(Math.random() * 1000) + 1;

    // Update tasks state
    setTasks(prevTasks => [
      ...prevTasks,
      { id: taskId, name: taskName, batches: taskBatches, status: 'inactive' }
    ]);

    // Calculate duration in seconds
    const durationInSeconds = taskBatches * 30 * 60; // 30 minutes per batch

    // Start countdown timer
    startTimer(taskId, durationInSeconds);
  };

  // Function to update productive and wasted time
  const updateProductivity = () => {
    const activeTasks = tasks.filter(task => task.status === 'active');
    activeTasks.forEach(task => {
      setProductiveTime(prevTime => prevTime + 1);
    });

    const pausedTasks = tasks.filter(task => task.status === 'paused');
    pausedTasks.forEach(task => {
      setWastedTime(prevTime => prevTime + 1);
    });
  };

  // UseEffect hook to update productivity
  useEffect(() => {
    const productivityTimer = setInterval(() => {
      updateProductivity();
    }, 1000);

    return () => clearInterval(productivityTimer);
  }, [tasks]);

  const handleCheckboxChange = (taskId) => {
    if (tasks.find(task => task.id === taskId).status === 'active') {
      stopTimer(taskId);
    }
    else {
      const taskBatches = tasks.find(task => task.id === taskId).batches;
      const durationInSeconds = taskBatches * 30 * 60; // 30 minutes per batch
      startTimer(taskId, durationInSeconds);
    }
  };

  const handleTaskCompletion = (taskId) => {
    clearInterval(timers[taskId]);

    // Update task status
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const renderTasks = () => {
    return (
      <List
        dataSource={tasks}
        renderItem={task => (
          <motion.div 
            key={task.id} 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', marginBottom: 10 }}
          >
            <Checkbox 
              checked={task.status === 'active'} 
              onChange={() => handleCheckboxChange(task.id)} 
              disabled={task.status === 'completed'}
            />
            <div style={{ marginLeft: 16, width: 'calc(100% - 250px)' }}>
              <h3>{task.name}</h3>
              <p>Batches: {task.batches}</p>
              {task.status === 'active' && (
                <div style={{ textAlign: 'center' }}>
                  <svg viewBox="0 0 100 100" width="50" height="50">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      strokeWidth="5"
                      stroke="#007bff"
                      strokeLinecap="round"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 270 + (timers[task.id] / (task.batches * 30 * 60)) * 360 }}
                      transition={{ duration: timers[task.id], ease: "linear" }}
                    />
                    <Text>{Math.floor(timers[task.id] / 60)}:{timers[task.id] % 60 < 10 ? `0${timers[task.id] % 60}` : timers[task.id] % 60}</Text>
                  </svg>
                </div>
              )}
            </div>
            <div style={{ marginLeft: 'auto', width: '250px', textAlign: 'right' }}>
              {task.status === 'active' ? (
                <Button type="primary" danger onClick={() => stopTimer(task.id)}>Stop</Button>
              ) : (
                <Button type="primary" onClick={() => handleCheckboxChange(task.id)}>Start</Button>
              )}
              {!task.status === 'completed' && (
                <Button type="primary" onClick={() => handleTaskCompletion(task.id)}>Complete</Button>
              )}
            </div>
          </motion.div>
        )}
      />
    );
  };

  return (
    <Dashboard>
      <h2>Day {currentDayOfYear} of the Year</h2>

      <div className="flex" style={{ width: '100%' }}>
        <div className="m-4" style={{ width: 'calc(100% - 300px)' }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>Add Task</Button>
          <Modal
            title="Add Task"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setModalVisible(false)}>Cancel</Button>,
              <Button key="add" type="primary" onClick={() => addTask(newTaskName, newTaskBatches)}>Add Task</Button>,
            ]}
          >
            <Input 
              placeholder="Task Name" 
              value={newTaskName} 
              onChange={(e) => setNewTaskName(e.target.value)} 
              style={{ marginBottom: 10 }} 
            />
            <Select
              placeholder="Select Batches"
              style={{ width: '100%' }}
              value={newTaskBatches}
              onChange={(value) => setNewTaskBatches(value)}
            >
              <Option value={1}>1 Batch</Option>
              <Option value={2}>2 Batches</Option>
              <Option value={3}>3 Batches</Option>
              {/* Add more options as needed */}
            </Select>
          </Modal>
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
