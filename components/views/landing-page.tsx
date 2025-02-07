'use server';
import LandingPageBody from '../shared/landing-page/landing-page-body';
import LandingPageFooter from '../shared/landing-page/landing-page-footer';
import LandingPageHeader from '../shared/landing-page/landing-page-header';

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
