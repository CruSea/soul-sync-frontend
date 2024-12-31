import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

const LandingPageBody = () => {
  return (
    <div className="flex-1 flex items-center justify-evenly h-full">
      <div className="flex flex-col justify-center gap-7">
        <div className="font-bold text-5xl max-w-[500px] text-center">
          Build the next Generation through Automation
        </div>
        <div className="font-normal text-lg max-w-[500px] text-center">
          TURUMBA helps you connect a mentor with a pupil to guide them through
          a journey with an Automation
        </div>
        <Link href="/log-in" className="mx-auto">
          <Button
            variant="default"
            className="rounded-[20px] w-min gap-2 p-3 "
            size="lg"
          >
            Get Started
            <LuArrowRight />
          </Button>
        </Link>
      </div>
      <div className="width">
        <Image
          src="/assets/landingImage.png"
          alt="Landing Page Image"
          width={650} // Intrinsic width of the image
          height={650} // Intrinsic height of the image
        />
      </div>
    </div>
  );
};

export default LandingPageBody;
