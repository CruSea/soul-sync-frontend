import LandingPageBody from "../shared/LandingPageBody";
import LandingPageFooter from "../shared/LandingPageFooter";
import LandingPageHeader from "../shared/LandingPageHeader";


const LandingPageView = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader />
      <LandingPageBody />
      <LandingPageFooter />
    </div>
  )
}

export default LandingPageView