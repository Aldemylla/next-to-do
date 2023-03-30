import { TasksContext } from "@/pages/contexts/TasksContext";
import { DeleteForeverOutlined, Check } from "@mui/icons-material";
import { MouseEvent, useContext } from "react";

interface TaskCardProps {
  task: string;
  isChecked: boolean;
  index: number;
}

export default function TaskCard({ task = "", isChecked = false, index = 0 }: TaskCardProps) {
  const { handleCompleteTask, deleteTask } = useContext(TasksContext);
  const ID = `task-${index}`;

  async function handleDeleteTask(event: MouseEvent) {
    event.stopPropagation();

    deleteTask(index);
  }

  return (
    <li
      className={`flex items-start gap-4 relative transition duration-75 ease-in-out border-2 border-neutral-600 hover:border-neutral-700 rounded-md shadow-md bg-neutral-700 hover:bg-neutral-600 p-5 ${
        isChecked ? "border-neutral-700 bg-neutral-800 " : ""
      }`}>
      <span
        className={`flex shrink-0 border border-sky-400 rounded-full w-4 h-4 ${
          isChecked ? "border-indigo-400 bg-indigo-400" : ""
        }`}>
        {isChecked && <Check className='m-auto w-3/4 h-max text-white' />}
      </span>
      <input
        id={ID}
        type='checkbox'
        className='absolute top-0 left-0 opacity-0 w-full h-full'
        defaultChecked={isChecked}
        onChange={(event) => handleCompleteTask(index, event.target.checked)}
      />
      <label
        htmlFor={ID}
        className={`-translate-y-[5px] w-full text-white text-justify break-all ${
          isChecked ? "text-neutral-400 line-through" : ""
        }`}>
        {task}
      </label>
      <button onClick={handleDeleteTask} className='z-10'>
        <DeleteForeverOutlined className='text-neutral-400' />
      </button>
    </li>
  );
}
