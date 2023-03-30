import Head from "next/head";

import { ToDoLogo } from "@/components/ToDoLogo";
import { AddTask } from "@/components/AddTask";
import { TasksList } from "@/components/TasksList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next ToDo</title>
        <meta name='description' content='To-do list' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='grid justify-items-stretch grid-rows-[200px_auto] bg-neutral-800 min-h-screen h-full'>
        <header className='flex items-center justify-center bg-neutral-900'>
          <ToDoLogo />
        </header>
        <section className='p-20 pt-0'>
          <AddTask />
          <TasksList />
        </section>
      </main>
    </>
  );
}

