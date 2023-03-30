import { TasksContext } from "@/pages/contexts/TasksContext";
import { useContext } from "react";
import TaskCard from "./components/TaskCard";

export function TasksList() {
  const { tasks, getCompletedTasks } = useContext(TasksContext);
  return (
    <section className='space-y-6'>
      <header className='flex justify-end sm:justify-between text-sm font-semibold first-letter:uppercase'>
        <h2 className='hidden items-center gap-2 text-sky-400 sm:flex'>
          Tarefas criadas
          <p className='rounded-full bg-neutral-700 py-0.5 px-2 w-max text-xs text-white'>
            {tasks.length}
          </p>
        </h2>
        <h2 className='flex items-center gap-2 text-indigo-400'>
          Concluídas
          <p className='rounded-full bg-neutral-700 py-0.5 px-2 w-max text-xs text-white'>
            {tasks.length === 0 ? "0" : `${getCompletedTasks()} de ${tasks.length}`}
          </p>
        </h2>
      </header>

      <ol className='space-y-3'>
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task.description} index={index} isChecked={task.completed} />
        ))}
      </ol>
    </section>
  );
}
