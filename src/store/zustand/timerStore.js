// import create from 'zustand';
// import axios from 'axios';
// import { message } from 'antd';
// import moment from 'moment';
// import { baseUrl } from '../../constants';

// const useTimerStore = create((set, get) => ({
//   tasks: [],
//   timers: {},
//   productiveTime: 0,
//   wastedTime: 0,

//   fetchTasks: async () => {
//     try {
//       const response = await axios.get(`${baseUrl}tasks`);
//       const tasks = response.data;
//       const currentDayOfYear = moment().dayOfYear();
//       const filteredTasks = tasks.filter(task => task.day === currentDayOfYear);

//       const categorizedTasks = filteredTasks.reduce((acc, task) => {
//         const { type } = task;
//         if (!acc[type]) {
//           acc[type] = [];
//         }
//         acc[type].push(task);
//         return acc;
//       }, {});

//       set({ tasks: categorizedTasks });
//     } catch (error) {
//       message.error("Error fetching tasks");
//       console.error("Error fetching tasks:", error);
//     }
//   },

//   addTask: async (task) => {
//     try {
//       const response = await axios.post(`${baseUrl}tasks`, task);
//       const newTask = response.data;
//       set((state) => ({
//         tasks: {
//           ...state.tasks,
//           [newTask.type]: [...(state.tasks[newTask.type] || []), newTask],
//         },
//       }));
//       message.success("Task added successfully");
//     } catch (error) {
//       message.error("Error adding task");
//       console.error("Error adding task:", error);
//     }
//   },

//   startTimer: (taskId, duration) => {
//     const state = get();
//   console.log(state.tasks,"state.timers[taskId]");

//     const currentTask = state.tasks.flat().find(task => task.id === taskId);
//     if (currentTask && !state.timers[taskId]?.isRunning) {
//       const intervalId = setInterval(() => {
//         set((state) => {
//           const timer = state.timers[taskId];
//           if (timer.remaining <= 0) {
//             clearInterval(timer.intervalId);
//             return {
//               timers: {
//                 ...state.timers,
//                 [taskId]: { ...timer, remaining: 0, isRunning: false },
//               },
//             };
//           }
//           return {
//             timers: {
//               ...state.timers,
//               [taskId]: { ...timer, remaining: timer.remaining - 1 },
//             },
//           };
//         });
//       }, 1000);
  
//       set((state) => ({
//         timers: {
//           ...state.timers,
//           [taskId]: { remaining: duration, isRunning: true, intervalId },
//         },
//       }));
//     }
//   },
  

//   pauseTimer: (taskId) => {
//     const state = get();
//     const timer = state.timers[taskId];
//     if (timer && timer.isRunning) {
//       clearInterval(timer.intervalId);
//       set((state) => ({
//         timers: {
//           ...state.timers,
//           [taskId]: { ...timer, isRunning: false },
//         },
//       }));
//     }
//   },

//   resumeTimer: (taskId) => {
//     const state = get();
//     const timer = state.timers[taskId];
//     if (timer && !timer.isRunning) {
//       const intervalId = setInterval(() => {
//         set((state) => {
//           const timer = state.timers[taskId];
//           if (timer.remaining <= 0) {
//             clearInterval(timer.intervalId);
//             return {
//               timers: {
//                 ...state.timers,
//                 [taskId]: { ...timer, remaining: 0, isRunning: false },
//               },
//             };
//           }
//           return {
//             timers: {
//               ...state.timers,
//               [taskId]: { ...timer, remaining: timer.remaining - 1 },
//             },
//           };
//         });
//       }, 1000);

//       set((state) => ({
//         timers: {
//           ...state.timers,
//           [taskId]: { ...timer, isRunning: true, intervalId },
//         },
//       }));
//     }
//   },

//   stopTimer: (taskId) => {
//     const state = get();
//     const timer = state.timers[taskId];
//     if (timer) {
//       clearInterval(timer.intervalId);
//       set((state) => ({
//         timers: {
//           ...state.timers,
//           [taskId]: { ...timer, isRunning: false },
//         },
//       }));
//     }
//   },
// }));

// export default useTimerStore;


import create from 'zustand';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import { baseUrl } from '../../constants';

const useTimerStore = create((set, get) => ({
  tasks: {},
  timers: {},
  productiveTime: 0,
  wastedTime: 0,

  fetchTasks: async () => {
    try {
      const response = await axios.get(`${baseUrl}tasks`);
      const tasks = response.data;
      const currentDayOfYear = moment().dayOfYear();
      const filteredTasks = tasks.filter(task => task.day === currentDayOfYear);

      const categorizedTasks = filteredTasks.reduce((acc, task) => {
        const { type } = task;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(task);
        return acc;
      }, {});

      set({ tasks: categorizedTasks });
    } catch (error) {
      message.error("Error fetching tasks");
      console.error("Error fetching tasks:", error);
    }
  },

  addTask: async (task) => {
    try {
      const response = await axios.post(`${baseUrl}tasks`, task);
      const newTask = response.data;
      set((state) => ({
        tasks: {
          ...state.tasks,
          [newTask.type]: [...(state.tasks[newTask.type] || []), newTask],
        },
      }));
      message.success("Task added successfully");
    } catch (error) {
      message.error("Error adding task");
      console.error("Error adding task:", error);
    }
  },

  startTimer: (taskId, duration) => {
    const state = get();
    const allTasks = Object.values(state.tasks).flat();
    const currentTask = allTasks.find(task => task._id === taskId);
    
    if (currentTask && !state.timers[taskId]?.isRunning) {
      const intervalId = setInterval(() => {
        set((state) => {
          const timer = state.timers[taskId];
          if (timer.remaining <= 0) {
            clearInterval(timer.intervalId);
            return {
              timers: {
                ...state.timers,
                [taskId]: { ...timer, remaining: 0, isRunning: false },
              },
              tasks: {
                ...state.tasks,
                [currentTask.type]: state.tasks[currentTask.type].map(task =>
                  task._id === taskId ? { ...task, productiveTime: timer.productiveTime } : task
                ),
              },
            };
          }
          return {
            timers: {
              ...state.timers,
              [taskId]: { ...timer,remaining: timer.remaining - 1, productiveTime: (timer.productiveTime || 0) + 1 },
            },
            tasks: {
              ...state.tasks,
              [currentTask.type]: state.tasks[currentTask.type].map(task =>
                task._id === taskId ? { ...task ,status:'active', productiveTime: (timer.productiveTime || 0) + 1 } : task
              ),
            },
          };
        });
      }, 1000);
  
      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { remaining: duration, isRunning: true, intervalId, productiveTime: 0 },
        },
      }));
    }
  },
  
  
  

  pauseTimer: (taskId) => {
    const state = get();
    const allTasks = Object.values(state.tasks).flat();
    const currentTask = allTasks.find(task => task._id === taskId);
    console.log(currentTask,"currentTask");
    if (currentTask) {
        const timer = state.timers[taskId];
        if (timer && timer.isRunning) {
          console.log(timer);
            clearInterval(timer.intervalId);
            set((state) => ({
                timers: {
                    ...state.timers,
                    [taskId]: { ...timer, isRunning: false },
                },
                tasks: {
                    ...state.tasks,
                    [currentTask.type]: state.tasks[currentTask.type].map(task =>
                        task._id === taskId ? { ...task, status:'paused',wastedTime: (task.wastedTime || 0) + 1 } : task
                    ),
                },
            }));
        }
    }
},




  

  resumeTimer: (taskId) => {
    const state = get();
    const timer = state.timers[taskId];
    if (timer && !timer.isRunning) {
      const intervalId = setInterval(() => {
        set((state) => {
          const timer = state.timers[taskId];
          if (timer.remaining <= 0) {
            clearInterval(timer.intervalId);
            return {
              timers: {
                ...state.timers,
                [taskId]: { ...timer, remaining: 0, isRunning: false },
              },
            };
          }
          return {
            timers: {
              ...state.timers,
              [taskId]: { ...timer, remaining: timer.remaining - 1 },
            },
            tasks: {
              ...state.tasks,
              [timer.type]: state.tasks[timer.type].map(task =>
                task._id === taskId ? { ...task, productiveTime: (task.productiveTime || 0) + 1 } : task
              ),
            },
          };
        });
      }, 1000);
  
      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { ...timer, isRunning: true, intervalId },
        },
      }));
    }
  },
  resumeTimer: (taskId) => {
    const state = get();
    const timer = state.timers[taskId];
    if (timer && !timer.isRunning) {
      const intervalId = setInterval(() => {
        set((state) => {
          const timer = state.timers[taskId];
          if (timer.remaining <= 0) {
            clearInterval(timer.intervalId);
            return {
              timers: {
                ...state.timers,
                [taskId]: { ...timer, remaining: 0, isRunning: false },
              },
            };
          }
          return {
            timers: {
              ...state.timers,
              [taskId]: { ...timer, remaining: timer.remaining - 1 },
            },
            tasks: {
              ...state.tasks,
              [timer.type]: state.tasks[timer.type].map(task =>
                task._id === taskId ? { ...task, productiveTime: (task.productiveTime || 0) + 1 } : task
              ),
            },
          };
        });
      }, 1000);
  
      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { ...timer, isRunning: true, intervalId },
        },
      }));
    }
  },
    

  stopTimer: (taskId) => {
    const state = get();
    const timer = state.timers[taskId];
    if (timer) {
      clearInterval(timer.intervalId);
      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { ...timer, isRunning: false },
        },
      }));
    }
  },
}));

export default useTimerStore;
