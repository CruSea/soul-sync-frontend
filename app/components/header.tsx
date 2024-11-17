import Image from "next/image";
import GreetingSection from './greetingSection'
import ClockSection from './clockSection'
import UserActions from "./userActions";

export default function Header() {
  return (
    <div className="w-full h-[110px] flex justify-between p-8 border-b border-gray-200 ">
      <div className="flex gap-0 w-[495px] justify-between items-center">
        <GreetingSection date="16th July 2024" />
        <ClockSection />
      </div>
      <UserActions />
    </div>
  );
}
