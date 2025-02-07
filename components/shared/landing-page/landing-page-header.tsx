import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface LandingPageHeaderProps {
  showButton?: boolean;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  showButton = true,
}) => {
  return (
    <div className="w-full h-20 border-b border-neutral-200 px-14 flex items-center justify-between">
      <div className="flex gap-2.5 items-center">
        <Image
          src="/assets/turumba.png"
          alt="Image of a turumba"
          width={40}
          height={40}
        />
        <div className="font-bold text-2xl">TURUMBA</div>
      </div>
      {showButton && (
        <Link href="/log-in">
          <Button variant="default" className="rounded-[20px]" size="sm">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LandingPageHeader;
