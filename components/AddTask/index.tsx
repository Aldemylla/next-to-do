import { TasksContext } from "@/pages/contexts/TasksContext";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { KeyboardEvent, useContext, useState } from "react";

export function AddTask() {
  const { addTask } = useContext(TasksContext);

  const [newTaskDescription, setNewTaskDescription] = useState("");

  async function handleAddTask() {
    await addTask(newTaskDescription);
    setNewTaskDescription("");
  }

  function enterKeyListener(event: KeyboardEvent) {
    const KEY = event.key;

    if (KEY === "Enter") handleAddTask();
  }

  return (
    <div className='grid grid-cols-[auto_100px] gap-2 -translate-y-1/2 w-full'>
      <input
        type='text'
        placeholder='Nova tarefa'
        className='transition duration-75 ease-in-out outline-none border-neutral-900 rounded-md focus:ring focus:ring-white focus:ring-opacity-30 bg-neutral-700 p-4 w-full text-neutral-200 placeholder:text-neutral-400'
        onChange={(event) => setNewTaskDescription(event.target.value)}
        onKeyDown={(event) => enterKeyListener(event)}
        value={newTaskDescription}
      />

      <button
        className='flex items-center gap-2 rounded-md shadow-sm bg-sky-500 hover:bg-sky-600 p-4 max-w-min text-white font-semibold'
        onClick={handleAddTask}>
        Criar
        <AddCircleOutlineRounded />
      </button>
    </div>
  );
}
