const GreetingSection = ({ date }: { date: string }) => {
  return (
    <div className="flex">
      <div className="relative flex flex-col px-2 gap-1">
        <h1 className="font-bold text-2xl sm:text-3xl leading-[130%]">Greetings, Mentor</h1>
        <p className="text-slate-500 font-medium text-lg sm:text-xl">{date}</p>
        <div className="absolute top-0 bottom-0 right-[-45px] border-l-[2px] border-black"></div>
      </div>
    </div>
  );
};
export default GreetingSection;