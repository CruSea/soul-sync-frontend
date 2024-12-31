import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuCamera } from "react-icons/lu";

const AccountImage = () => {
  return (
    <div className="relative">
      <Avatar className=" w-36 h-36 cursor-pointer mx-6">
        <AvatarImage
          src="/assets/avatars/woman1.png"
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          CN
        </AvatarFallback>
      </Avatar>
      <div className="absolute bottom-3 right-7 cursor-pointer flex items-center justify-center z-10 w-6 h-6 rounded-full bg-black">
        <LuCamera stroke="white" />
      </div>
    </div>
  );
};

export default AccountImage