"use client"

import LandingPageBody from "../shared/LandingPage/LandingPageBody";
import LandingPageFooter from "../shared/LandingPage/LandingPageFooter";
import LandingPageHeader from "../shared/LandingPage/LandingPageHeader";

import { useRouter } from 'next/navigation';


const LandingPageView = () => {

  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/log-in');
  };

  return (
    <div className=" flex flex-col min-h-screen">
      <LandingPageHeader handleGetStarted={handleGetStarted} />
      <LandingPageBody handleGetStarted={handleGetStarted} />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageView