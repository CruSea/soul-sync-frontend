const LandingPageFooter = () => {
  return (
    <div className="w-full h-24 bg-neutral-300 flex justify-between items-center px-72">
    <div className="flex flex-col justify-center">
      <div className="text-3xl font-medium text-center">10M+</div>
      <div className="text-base text-center">Messages Processed</div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-3xl font-medium text-center">99.9%</div>
      <div className="text-base text-center">Uptime</div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-3xl font-medium text-center">3000M+</div>
      <div className="text-base text-center">Users capacity</div>
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-3xl font-medium text-center">24/7</div>
      <div className="text-base text-center">Support</div>
    </div>
  </div>
  )
}

export default LandingPageFooter