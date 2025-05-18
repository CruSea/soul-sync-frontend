'use client';

import LandingPageBody from '../shared/landing-page/landing-page-body';
import LandingPageFooter from '../shared/landing-page/landing-page-footer';
import LandingPageHeader from '../shared/landing-page/landing-page-header';

const LandingPageView = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <LandingPageHeader />
      <main className="flex-1">
        <LandingPageBody />
      </main>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageView;
