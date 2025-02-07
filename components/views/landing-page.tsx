'use server';
import LandingPageBody from '../shared/landing-page/LandingPageBody';
import LandingPageFooter from '../shared/landing-page/LandingPageFooter';
import LandingPageHeader from '../shared/landing-page/LandingPageHeader';

const LandingPageView = async () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <LandingPageHeader />
      <LandingPageBody />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageView;
