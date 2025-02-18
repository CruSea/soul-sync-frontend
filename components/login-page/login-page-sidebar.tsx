import Image from 'next/image';
import { PiAsteriskSimpleBold } from 'react-icons/pi';
import { loginPage } from '@/content/page';

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
        <div className="font-extrabold text-4xl flex gap-2 items-center tracking-[15px] ml-[-10px]">
          <PiAsteriskSimpleBold size={55} />
          {loginPage.title}
        </div>
        <div className="font-bold text-4xl w-full whitespace-pre-line">
          <div>
            {loginPage.line1}
            <br />
            {loginPage.line2}
          </div>
        </div>
        <div className="font-normal text-lg">{loginPage.description}</div>
      </div>
    </div>
  );
};

export default LoginPageSidebar;
