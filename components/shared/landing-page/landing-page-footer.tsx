const LandingPageFooter = () => {
  return (
    <div className="w-full bg-neutral-300 px-6 md:px-72 py-4 md:py-6 flex flex-wrap md:flex-nowrap justify-around items-center gap-6">
      {[
        { value: '10M+', label: 'Messages Processed' },
        { value: '99.9%', label: 'Uptime' },
        { value: '3000M+', label: 'Users capacity' },
        { value: '24/7', label: 'Support' },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center text-center min-w-[80px]">
          <div className="text-xl md:text-3xl font-medium">{item.value}</div>
          <div className="text-sm md:text-base">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default LandingPageFooter;
