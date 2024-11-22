import BellIcon from "@/components/shared/Icons/BellIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserActions = () => {
  return (
    <div className="ml-auto flex gap-5 items-center">
      <BellIcon size={30} hasNotification={true} />
      <Avatar className="w-[60px] h-[60px] cursor-pointer">
        <AvatarImage
          src="/assets/avatars/woman1.png"
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          CN
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserActions;
