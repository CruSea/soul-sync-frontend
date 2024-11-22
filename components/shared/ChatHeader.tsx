import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const ChatHeader = () => {
  return (
    <CardHeader className="w-full bg-neutral-300 rounded-t-lg shadow-custom-chat flex flex-row gap-2.5 items-center px-5 py-2.5">
      <Avatar className="w-[50px] h-[50px]">
        <AvatarImage
          src="/assets/avatars/man1.png"
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
          JD
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-0">
        <CardTitle className="font-bold text-2xl mb-[-5px]">Jennie Doe</CardTitle>
        <CardDescription className="font-bold text-xs text-neutral-500 ">JennieDoe@example.com</CardDescription>
      </div>
        
    </CardHeader>
  )
}

export default ChatHeader