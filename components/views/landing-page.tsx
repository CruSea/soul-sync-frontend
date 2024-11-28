import Image from "next/image";
import { Button } from "@/components/ui/button"
import { LuArrowRight } from "react-icons/lu";


const LandingPageView = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full h-20 border-b border-neutral-200 px-14 flex items-center justify-between">
        <div className="flex gap-2.5 items-center">
          <Image
            src='/assets/turumba.png'
            alt="Image of a turumba"
            width={40}
            height={40}

          />
          <div className="font-bold text-2xl">TURUMBA</div>
        </div>
        <Button variant="default" className="rounded-[20px]" size="sm">Get Started</Button>
      </div>
      <div className="flex-1 flex items-center justify-evenly">
        <div className="flex flex-col justify-center gap-7">
          <div className="font-bold text-5xl max-w-[500px] text-center">
            Build the next Generation through Automation
          </div>
          <div className="font-normal text-lg max-w-[500px] text-center">
            TURUMBA helps you connect a mentor with a pupil to guide them through a journey with an Automation
          </div>
          <Button variant="default" className="rounded-[20px] w-min gap-2 p-3 mx-auto" size="lg">
            Get Started
            <LuArrowRight />
          </Button>
        </div>
        <Image
          src='/assets/landingImage.png'
          alt="Landing Page Image"
          width={640}
          height={640}
        />
      </div>
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
    </div>
  )
}

export default LandingPageView