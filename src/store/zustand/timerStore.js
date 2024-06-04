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
                  task._id === taskId ? { ...task, productiveTime: timer.productiveTime, status: 'complete' } : task
                ),
              },
            };
          }
          return {
            timers: {
              ...state.timers,
              [taskId]: { ...timer, remaining: timer.remaining - 1, productiveTime: (timer.productiveTime || 0) + 1 },
            },
            tasks: {
              ...state.tasks,
              [currentTask.type]: state.tasks[currentTask.type].map(task =>
                task._id === taskId ? { ...task, status: 'active', productiveTime: (timer.productiveTime || 0) + 1 } : task
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
    
    if (currentTask) {
      const timer = state.timers[taskId];
      if (timer && timer.isRunning) {
        clearInterval(timer.intervalId);

        const wastedIntervalId = setInterval(() => {
          set((state) => {
            const currentTaskInState = state.tasks[currentTask.type].find(task => task._id === taskId);
            const newWastedTime = (currentTaskInState.wastedTime || 0) + 1;

            return {
              timers: {
                ...state.timers,
                [taskId]: { ...timer, isRunning: false, wastedIntervalId },
              },
              tasks: {
                ...state.tasks,
                [currentTask.type]: state.tasks[currentTask.type].map(task =>
                  task._id === taskId ? { ...task, status: 'paused', wastedTime: newWastedTime } : task
                ),
              },
            };
          });
        }, 1000); 
      }
    }
  },

  resumeTimer: (taskId) => {
    const state = get();
    const allTasks = Object.values(state.tasks).flat();
    const currentTask = allTasks.find(task => task._id === taskId);

    if (currentTask) {
      const timer = state.timers[taskId];
      if (timer && !timer.isRunning) {
        if (timer.wastedIntervalId) {
          clearInterval(timer.wastedIntervalId); 
        }

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
                    task._id === taskId ? { ...task, productiveTime: timer.productiveTime, status: 'complete' } : task
                  ),
                },
              };
            }
            return {
              timers: {
                ...state.timers,
                [taskId]: { ...timer, remaining: timer.remaining - 1, productiveTime: (timer.productiveTime || 0) + 1 },
              },
              tasks: {
                ...state.tasks,
                [currentTask.type]: state.tasks[currentTask.type].map(task =>
                  task._id === taskId ? { ...task, status: 'active', productiveTime: (timer.productiveTime || 0) + 1 } : task
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
    }
  },

  stopTimer: (taskId) => {
    const state = get();
    const allTasks = Object.values(state.tasks).flat();
    const currentTask = allTasks.find(task => task._id === taskId);
    const timer = state.timers[taskId];
    
    if (currentTask) {
      if (timer.intervalId) {
        clearInterval(timer.intervalId);
      }
      if (timer.wastedIntervalId) {
        clearInterval(timer.wastedIntervalId);
      }
      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { ...timer, isRunning: false, remaining: 0, productiveTime: 0, wastedIntervalId: null, intervalId: null },
        },
        tasks: {
          ...state.tasks,
          [currentTask.type]: state.tasks[currentTask.type].map(task =>
            task._id === taskId ? { ...task, productiveTime: 0, wastedTime: 0, status: 'created' } : task
          ),
        },
      }));
    }
  },
  completeTask: (taskId) => {
    const state = get();
    const allTasks = Object.values(state.tasks).flat();
    const currentTask = allTasks.find(task => task._id === taskId);
    const timer = state.timers[taskId];

    if (currentTask) {
      if (timer.intervalId) {
        clearInterval(timer.intervalId);
      }
      if (timer.wastedIntervalId) {
        clearInterval(timer.wastedIntervalId);
      }

      set((state) => ({
        timers: {
          ...state.timers,
          [taskId]: { ...timer, isRunning: false, remaining: 0, productiveTime: timer.productiveTime, wastedIntervalId: null, intervalId: null },
        },
        tasks: {
          ...state.tasks,
          [currentTask.type]: state.tasks[currentTask.type].map(task =>
            task._id === taskId ? { ...task, status:'complete' } : task
          ),
        },
      }));
     let taskTobeSend =  Object.values(state.tasks).flat().find(task => task._id === taskId)
     taskTobeSend.status ="complete"
      axios.patch(`${baseUrl}tasks/${taskId}`, taskTobeSend)
        .then(response => {
          console.log('Task successfully marked complete on server:', response.data);
          message.info("Task successfully marked complete on server!")
          if (response.data && response.data.taskId) { 
            set((state) => ({
              ...state, 
              tasks: {
                ...state.tasks,
                [response.data.type]: state.tasks[response.data.type].map(task =>
                  task._id === response.data.taskId ? response.data : task 
                ),
              },
            }));
          }
        })
        .catch(error => {
          message.error("Error completing the task!")
          console.error('Error updating task on server:', error);
        });
    }
  },
}));

export default useTimerStore;
