import Image from "next/image";
import GreetingSection from './greetingSection'
import ClockSection from './clockSection'
import UserActions from "./userActions";

const Header: React.FC = () => {
  return (
    <div className="w-full h-[110px] flex justify-between p-8 border-b border-gray-200 ">
      <div className="flex gap-10 w-[530px] justify-between items-center">
        <GreetingSection date="16th July 2024" />
        <ClockSection />
      </div>
      <UserActions />
    </div>
  );
}

export default Header;