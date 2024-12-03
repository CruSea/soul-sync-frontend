"use client"

import LandingPageBody from "../shared/LandingPageBody";
import LandingPageFooter from "../shared/LandingPageFooter";
import LandingPageHeader from "../shared/LandingPageHeader";

import { useRouter } from 'next/navigation';


const LandingPageView = () => {

  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/log-in');
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader handleGetStarted={handleGetStarted} />
      <LandingPageBody handleGetStarted={handleGetStarted} />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageView