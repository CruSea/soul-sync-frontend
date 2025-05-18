import Image from 'next/image';
import { PiAsteriskSimpleBold } from 'react-icons/pi';
import { loginPage } from '@/content/page';

const LoginPageSidebar = () => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="w-24 h-24 relative mb-2">
        <Image
          src="/assets/adminSignIn.png"
          alt="Admin SignIn Page Image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="text-3xl font-extrabold flex items-center gap-2 tracking-widest">
        <PiAsteriskSimpleBold size={32} />
        {loginPage.title}
      </div>
    </div>
  );
};

export default LoginPageSidebar;
