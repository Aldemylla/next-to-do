import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface TaskType {
  description: string;
  completed: boolean;
}

export type TasksContextType = {
  tasks: TaskType[];
  addTask: (task: string) => void;
  deleteTask: (taskIndex: number) => void;
  getCompletedTasks: () => number;
  handleCompleteTask: (taskIndex: number, completed: boolean) => void;
};

const TASKS_CONTEXT_DEFAULT = {
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  getCompletedTasks: () => 0,
  handleCompleteTask: () => {},
} as TasksContextType;

export const TasksContext = createContext(TASKS_CONTEXT_DEFAULT);

export default function TasksContextProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  function addTask(description: string) {
    if (description) {
      setTasks([...tasks, { description, completed: false }]);
    }
  }

  function deleteTask(taskIndex: number) {
    setTasks((oldTasks) => oldTasks.filter((task, index) => index !== taskIndex));
  }

  function handleCompleteTask(taskIndex: number, completed: boolean) {
    const newTasks = [...tasks];
    newTasks[taskIndex].completed = completed;

    setTasks(newTasks);
  }

  function getCompletedTasks() {
    return tasks.filter((task) => task.completed).length;
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, handleCompleteTask, getCompletedTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
