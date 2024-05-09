// timerStore.js
import create from 'zustand';

const productStore = create((set) => ({
  tasks: [],
  timers: {},
  productiveTime: 0, 
  wastedTime: 0, 
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  startTimer: (taskId, duration) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [taskId]: setInterval(() => {
          set((state) => ({
            timers: {
              ...state.timers,
              [taskId]: state.timers[taskId] - 1,
            },
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? { ...task, productiveTime: task.productiveTime + 1 }
                : task
            ),
          }));
        }, 1000),
      },
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'active',
              timerId: state.timers[taskId],
            }
          : task
      ),
    })),
  stopTimer: (taskId) =>
    set((state) => {
      clearInterval(state.timers[taskId]);
      return {
        timers: { ...state.timers, [taskId]: null },
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: 'stop' } : task
        ),
      };
    }),
  pauseTimer: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'paused' } : task
      ),
    })),
  completeTask: (taskId) =>
    set((state) => {
      clearInterval(state.timers[taskId]);
      const completedTask = state.tasks.find((task) => task.id === taskId);
      return {
        timers: { ...state.timers, [taskId]: null },
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, status: 'completed' } : task
        ),
        productiveTime: state.productiveTime + completedTask.productiveTime,
        wastedTime: state.wastedTime + completedTask.wastedTime,
      };
    }),
}));

export default useTimerStore;
