'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';

const LandingPageBody = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly w-full px-6 md:px-0 py-12 md:py-0">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col justify-center gap-7 max-w-[500px] text-center">
        <div className="font-bold text-5xl">Build the next Generation through Automation</div>
        <div className="font-normal text-lg">
          TURUMBA helps you connect a mentor with a pupil to guide them through a journey with an Automation
        </div>
        <Link href="/log-in" className="mx-auto">
          <Button variant="default" className="rounded-[20px] w-min gap-2 p-3" size="lg">
            Get Started
            <LuArrowRight />
          </Button>
        </Link>
      </div>

      <div className="hidden md:block">
        <Image
          src="/assets/landingImage.png"
          alt="Landing Page Image"
          width={650}
          height={650}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center gap-5 w-full max-w-[400px] mx-auto">
        {/* Image First */}
        <Image
          src="/assets/landingImage.png"
          alt="Landing Page Image"
          width={320}
          height={320}
          className="object-contain"
        />

        {/* TURUMBA Text */}
        <div className="text-sm text-center text-gray-700 px-2">
          TURUMBA helps you connect a mentor with a pupil to guide them through a journey with an Automation
        </div>

        {/* Get Started Button */}
        <Link href="/log-in" className="w-full flex justify-center">
          <Button
            variant="default"
            className="rounded-[20px] gap-2 px-6 py-3 w-full max-w-[300px]"
          >
            Get Started
            <LuArrowRight />
          </Button>
        </Link>

        {/* Headline */}
        <div className="text-2xl font-bold text-center leading-snug mt-2">
          Build the next Generation through Automation
        </div>
      </div>
    </div>
  );
};

export default LandingPageBody;
