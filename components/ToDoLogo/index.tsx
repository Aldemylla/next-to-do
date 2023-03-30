import { RocketLaunchOutlined } from "@mui/icons-material";

export function ToDoLogo() {
  return (
    <div className='flex gap-2 items-center h-12 w-auto font-extrabold'>
      <svg className='w-0 h-0'>
        <linearGradient id='rocketGradient' x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor='rgba(56, 189, 248, 1)' />
          <stop offset={1} stopColor='rgba(99, 102, 241, 1)' />
        </linearGradient>
      </svg>
      <RocketLaunchOutlined className='h-full w-auto fill-[url(#rocketGradient)]' />

      <h1 className='text-5xl'>
        <span className='h-max w-max text-sky-400'>to</span>
        <span className='h-max w-max text-indigo-500'>do</span>
      </h1>
    </div>
  );
}
