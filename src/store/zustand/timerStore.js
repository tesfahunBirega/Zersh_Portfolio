import create from 'zustand';

const useTimerStore = create((set) => ({
  tasks: [],
  timers: {},
  productiveTime: 0,
  wastedTime: 0,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  startTimer: (taskId, duration) =>
    set((state) => {
      let countDown = duration; // Initialize countdown with duration
      const timerId = setInterval(() => {
        countDown -= 1; // Decrease countdown by 1 second
        if (countDown < 0) {
          clearInterval(timerId); // Stop the timer when countdown reaches 0
        }
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: timerId,
          },
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  countDown, // Update countDown in task
                }
              : task
          ),
        }));
      }, 1000);
        return ({
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
                      ? {
                          ...task,
                          productiveTime:
                            task.status === 'active'
                              ? task.productiveTime + 1
                              : task.productiveTime,
                          wastedTime:
                            task.status === 'paused'
                              ? task.wastedTime + 1
                              : task.wastedTime,
                        }
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
          }
        )
      }
    )
      
      

  ,
    stopTimer: (taskId) =>
      set((state) => {
        clearInterval(state.timers[taskId]);
        return {
          timers: { ...state.timers, [taskId]: null },
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: 'reset', productiveTime: 0, wastedTime: 0 }
              : task
          ),
        };
      }),
  
  pauseTimer: (taskId) =>
    set((state) => {
      clearInterval(state.timers[taskId]);
      const currentTask = state.tasks.find((task) => task.id === taskId);
      const updatedProductiveTime =
        currentTask.productiveTime ;
      return {
        timers: { ...state.timers, [taskId]: null },
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: 'paused',
                productiveTime: updatedProductiveTime,
              }
            : task
        ),
      };
    }),
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
