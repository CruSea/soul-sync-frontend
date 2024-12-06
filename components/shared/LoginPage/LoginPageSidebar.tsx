import Image from "next/image";
import { PiAsteriskSimpleBold } from "react-icons/pi";

const LoginPageSidebar = () => {
  return (
    <div className="w-[643px] flex flex-col text-gray-900 bg-[#D9D9D9]  font-manrope">
      <Image
        src="/assets/adminSignIn.png"
        alt="Admin SignIn Page Image"
        width={540}
        height={604}
        className="mx-auto"
      />
      <div className="flex-1 flex flex-col gap-5 justify-center px-12 border-t-[5px] border-black ">
        <div className="font-extrabold text-4xl flex gap-2 items-center tracking-[15px] ml-[-10px]"><PiAsteriskSimpleBold size={55} /> TURUMBA</div>
        <div className="font-bold text-4xl w-full whitespace-pre-line">
          <div>Connect with <br /> your audience Today.</div>
        </div>
        <div className="font-normal text-lg">
          Connect Mentors and Peoples anytime anywhere
        </div>
      </div>
    </div>
  )
}

export default LoginPageSidebar