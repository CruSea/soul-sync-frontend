
import LandingPageBody from "../shared/LandingPage/LandingPageBody";
import LandingPageFooter from "../shared/LandingPage/LandingPageFooter";
import LandingPageHeader from "../shared/LandingPage/LandingPageHeader";


const LandingPageView = () => {
  
  return (
    <div className=" flex flex-col min-h-screen">
      <LandingPageHeader />
      <LandingPageBody />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageView