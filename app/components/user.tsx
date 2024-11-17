import Image from "next/image";
import { cn } from '../utils'

interface UserProps {
  name: string;            // user's name
  title: string;           // user's title
  chooseUser: () => void;  // Function to select user
  isChosen: boolean        // Is the user currently selected
}

const User: React.FC<UserProps> = ({ name, title, chooseUser, isChosen }) => {
  return (
    <div className={cn(
      "mx-0.5 h-16 rounded-xl flex gap-3.5 px-2.5 items-center cursor-pointer",
      isChosen ? "bg-neutral-200" : ""
      )}
      onClick={chooseUser}>
      <Image
        src="/assets/profile.png"
        alt="user image"
        layout="fixed"
        width={100}
        height={100}
        className="w-10 h-10 border-black rounded-full"
      />
      <div className="flex  flex-col gap-0">
        <div className="font-bold text-xl mb-[-5px]">{name}</div>
        <div className="font-normal text-sm text-neutral-400">
          {title}
        </div>
      </div>
    </div>
  )
}

export default User;