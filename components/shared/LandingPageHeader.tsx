import Image from "next/image";
import { Button } from "@/components/ui/button"

interface LandingPageHeaderProps {
  handleGetStarted: () => void;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({ handleGetStarted }) => {
  return (
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
      <Button variant="default" className="rounded-[20px]" size="sm" onClick={handleGetStarted}>Get Started</Button>
    </div>
  )
}

export default LandingPageHeader