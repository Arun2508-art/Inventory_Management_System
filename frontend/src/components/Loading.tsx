const Loading = () => {
  return (
    <div className='flex gap-2 h-full w-full items-center justify-center'>
      <div className='size-6 animate-bounce rounded-full bg-blue'></div>
      <div className='size-6 animate-bounce rounded-full bg-Yellow'></div>
      <div className='size-6 animate-bounce rounded-full bg-Purple'></div>
    </div>
  );
};

export default Loading;
