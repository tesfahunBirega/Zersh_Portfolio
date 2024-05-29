// import create from 'zustand';
// import { baseUrl } from '../../constants';
// import axios from 'axios';

// const useTimerStore = create((set) => ({
//   tasks: [],
//   timers: {},
//   productiveTime: 0,
//   wastedTime: 0,
//   addTask: async (task) =>{
//     try {
//       const response = await axios.post(`${baseUrl}tasks`, task);
//       set((state) => ({
//         tasks: [...state.tasks, response.data],
//       }));
//     } catch (error) {
//       // Show Toast Message antd message 
//       console.error("Error adding task:", error);
//     }
//   },
//   startTimer: (taskId, duration) =>
//     set((state) => {
//       let countDown = duration; // Initialize countdown with duration
//       const timerId = setInterval(() => {
//         countDown -= 1; // Decrease countdown by 1 second
//         if (countDown < 0) {
//           clearInterval(timerId); // Stop the timer when countdown reaches 0
//         }
//         set((state) => ({
//           timers: {
//             ...state.timers,
//             [taskId]: timerId,
//           },
//           tasks: state.tasks.map((task) =>
//             task.id === taskId
//               ? {
//                   ...task,
//                   countDown, // Update countDown in task
//                 }
//               : task
//           ),
//         }));
//       }, 1000);
//         return ({
//             timers: {
//               ...state.timers,
//               [taskId]: setInterval(() => {
//                 set((state) => ({
//                   timers: {
//                     ...state.timers,
//                     [taskId]: state.timers[taskId] - 1,
//                   },
//                   tasks: state.tasks.map((task) =>
//                     task.id === taskId
//                       ? {
//                           ...task,
//                           productiveTime:
//                             task.status === 'active'
//                               ? task.productiveTime + 1
//                               : task.productiveTime,
//                           wastedTime:
//                             task.status === 'paused'
//                               ? task.wastedTime + 1
//                               : task.wastedTime,
//                         }
//                       : task
//                   ),
//                 }));
//               }, 1000),
//             },
//             tasks: state.tasks.map((task) =>
//               task.id === taskId
//                 ? {
//                     ...task,
//                     status: 'active',
//                     timerId: state.timers[taskId],
//                   }
//                 : task
//             ),
//           }
//         )
//       }
//     )
      
      

//   ,
//     stopTimer: (taskId) =>
//       set((state) => {
//         clearInterval(state.timers[taskId]);
//         return {
//           timers: { ...state.timers, [taskId]: null },
//           tasks: state.tasks.map((task) =>
//             task.id === taskId
//               ? { ...task, status: 'reset', productiveTime: 0, wastedTime: 0 }
//               : task
//           ),
//         };
//       }),
  
//   pauseTimer: (taskId) =>
//     set((state) => {
//       clearInterval(state.timers[taskId]);
//       const currentTask = state.tasks.find((task) => task.id === taskId);
//       const updatedProductiveTime =
//         currentTask.productiveTime ;
//       return {
//         timers: { ...state.timers, [taskId]: null },
//         tasks: state.tasks.map((task) =>
//           task.id === taskId
//             ? {
//                 ...task,
//                 status: 'paused',
//                 productiveTime: updatedProductiveTime,
//               }
//             : task
//         ),
//       };
//     }),
//   completeTask: (taskId) =>
//     set((state) => {
//       clearInterval(state.timers[taskId]);
//       const completedTask = state.tasks.find((task) => task.id === taskId);
//       return {
//         timers: { ...state.timers, [taskId]: null },
//         tasks: state.tasks.map((task) =>
//           task.id === taskId ? { ...task, status: 'completed' } : task
//         ),
//         productiveTime: state.productiveTime + completedTask.productiveTime,
//         wastedTime: state.wastedTime + completedTask.wastedTime,
//       };
//     }),
// }));

// export default useTimerStore;



// import create from 'zustand';
// import { baseUrl } from '../../constants';
// import axios from 'axios';
// import { message } from 'antd'; // Assuming you're using Ant Design for toast messages

// const useTimerStore = create((set) => ({
//   tasks: [],
//   timers: {},
//   productiveTime: 0,
//   wastedTime: 0,

//   fetchTasks: async () => {
//     try {
//       const response = await axios.get(`${baseUrl}tasks`);
//       set({ tasks: response.data });
//     } catch (error) {
//       message.error("Error fetching tasks");
//       console.error("Error fetching tasks:", error);
//     }
//   },

//   addTask: async (task) => {
//     try {
//       const response = await axios.post(`${baseUrl}tasks`, task);
//       set((state) => ({
//         tasks: [...state.tasks, response.data],
//       }));
//       message.success("Task added successfully");
//     } catch (error) {
//       message.error("Error adding task");
//       console.error("Error adding task:", error);
//     }
//   },

//   startTimer: (taskId, duration) =>
//     set((state) => {
//       let countDown = duration; // Initialize countdown with duration
//       const timerId = setInterval(() => {
//         countDown -= 1; // Decrease countdown by 1 second
//         if (countDown < 0) {
//           clearInterval(timerId); // Stop the timer when countdown reaches 0
//         }
//         set((state) => ({
//           timers: {
//             ...state.timers,
//             [taskId]: timerId,
//           },
//           tasks: state.tasks.map((task) =>
//             task.id === taskId
//               ? {
//                   ...task,
//                   countDown,
//                 }
//               : task
//           ),
//         }));
//       }, 1000);
//         return ({
//             timers: {
//               ...state.timers,
//               [taskId]: setInterval(() => {
//                 set((state) => ({
//                   timers: {
//                     ...state.timers,
//                     [taskId]: state.timers[taskId] - 1,
//                   },
//                   tasks: state.tasks.map((task) =>
//                     task.id === taskId
//                       ? {
//                           ...task,
//                           productiveTime:
//                             task.status === 'active'
//                               ? task.productiveTime + 1
//                               : task.productiveTime,
//                           wastedTime:
//                             task.status === 'paused'
//                               ? task.wastedTime + 1
//                               : task.wastedTime,
//                         }
//                       : task
//                   ),
//                 }));
//               }, 1000),
//             },
//             tasks: state.tasks.map((task) =>
//               task.id === taskId
//                 ? {
//                     ...task,
//                     status: 'active',
//                     timerId: state.timers[taskId],
//                   }
//                 : task
//             ),
//           }
//         )
//       }
//     ),

//   stopTimer: (taskId) =>
//     set((state) => {
//       clearInterval(state.timers[taskId]);
//       return {
//         timers: { ...state.timers, [taskId]: null },
//         tasks: state.tasks.map((task) =>
//           task.id === taskId
//             ? { ...task, status: 'reset', productiveTime: 0, wastedTime: 0 }
//             : task
//         ),
//       };
//     }),

//   pauseTimer: (taskId) =>
//     set((state) => {
//       clearInterval(state.timers[taskId]);
//       const currentTask = state.tasks.find((task) => task.id === taskId);
//       const updatedProductiveTime = currentTask.productiveTime;
//       return {
//         timers: { ...state.timers, [taskId]: null },
//         tasks: state.tasks.map((task) =>
//           task.id === taskId
//             ? {
//                 ...task,
//                 status: 'paused',
//                 productiveTime: updatedProductiveTime,
//               }
//             : task
//         ),
//       };
//     }),

//   completeTask: async (taskId) => {
//     try {
//       const response = await axios.put(`${baseUrl}tasks/${taskId}`, { status: 'completed' });
//       const completedTask = response.data;
//       set((state) => ({
//         timers: { ...state.timers, [taskId]: null },
//         tasks: state.tasks.map((task) =>
//           task.id === taskId ? completedTask : task
//         ),
//         productiveTime: state.productiveTime + completedTask.productiveTime,
//         wastedTime: state.wastedTime + completedTask.wastedTime,
//       }));
//       message.success("Task completed successfully");
//     } catch (error) {
//       message.error("Error completing task");
//       console.error("Error completing task:", error);
//     }
//   },
// }));

// export default useTimerStore;



import create from 'zustand';
import { baseUrl } from '../../constants';
import axios from 'axios';
import { message } from 'antd'; // Assuming you're using Ant Design for toast messages

const useTimerStore = create((set) => ({
  tasks: [],
  timers: {},
  productiveTime: 0,
  wastedTime: 0,

  fetchTasks: async () => {
    try {
      const response = await axios.get(`${baseUrl}tasks`);
      const tasks = response.data;
      const categorizedTasks = tasks.reduce((acc, task) => {
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

  startTimer: (taskId, duration) =>
    set((state) => {
      let countDown = duration;
      const timerId = setInterval(() => {
        countDown -= 1;
        if (countDown < 0) {
          clearInterval(timerId);
        }
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: timerId,
          },
          tasks: Object.keys(state.tasks).reduce((acc, type) => {
            acc[type] = state.tasks[type].map((task) =>
              task.id === taskId
                ? { ...task, countDown }
                : task
            );
            return acc;
          }, {}),
        }));
      }, 1000);

      return {
        timers: {
          ...state.timers,
          [taskId]: timerId,
        },
        tasks: Object.keys(state.tasks).reduce((acc, type) => {
          acc[type] = state.tasks[type].map((task) =>
            task.id === taskId
              ? { ...task, status: 'active', timerId }
              : task
          );
          return acc;
        }, {}),
      };
    }),

  stopTimer: (taskId) =>
    set((state) => {
      clearInterval(state.timers[taskId]);
      return {
        timers: { ...state.timers, [taskId]: null },
        tasks: Object.keys(state.tasks).reduce((acc, type) => {
          acc[type] = state.tasks[type].map((task) =>
            task.id === taskId
              ? { ...task, status: 'reset', productiveTime: 0, wastedTime: 0 }
              : task
          );
          return acc;
        }, {}),
      };
    }),

  pauseTimer: (taskId) =>
    set((state) => {
      clearInterval(state.timers[taskId]);
      const currentTask = Object.values(state.tasks).flat().find((task) => task.id === taskId);
      return {
        timers: { ...state.timers, [taskId]: null },
        tasks: Object.keys(state.tasks).reduce((acc, type) => {
          acc[type] = state.tasks[type].map((task) =>
            task.id === taskId
              ? { ...task, status: 'paused', productiveTime: currentTask.productiveTime }
              : task
          );
          return acc;
        }, {}),
      };
    }),

  completeTask: async (taskId) => {
    try {
      const response = await axios.patch(`${baseUrl}tasks/${taskId}`, { status: 'completed' });
      const completedTask = response.data;
      set((state) => ({
        timers: { ...state.timers, [taskId]: null },
        tasks: Object.keys(state.tasks).reduce((acc, type) => {
          acc[type] = state.tasks[type].map((task) =>
            task.id === taskId ? completedTask : task
          );
          return acc;
        }, {}),
        productiveTime: state.productiveTime + completedTask.productiveTime,
        wastedTime: state.wastedTime + completedTask.wastedTime,
      }));
      message.success("Task completed successfully");
    } catch (error) {
      message.error("Error completing task");
      console.error("Error completing task:", error);
    }
  },
}));

export default useTimerStore;
