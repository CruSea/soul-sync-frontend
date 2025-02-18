import { FiBell } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./accountDialog";
import { LuUser } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FiBell className="h-5 w-5" />
        </button>
        <Dialog>
          <DialogTrigger>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage
                src="/assets/avatars/woman1.png"
                className="w-full h-full object-cover"
              />
              <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
                CN
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent className="rounded-[6px] pt-4 pb-0 px-0 w-min translate-x-0 translate-y-0 top-12 left-auto right-2.5 ">
            <DialogHeader className="space-y-0 px-4">
              <DialogTitle className="text-start text-lg">Nathnael Desta</DialogTitle>
              <DialogDescription className="text-base">
                nathnaeldesta@gmail.com
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <Link href="/mentor/profile" className="flex gap-2 text-lg py-2 border border-y-slate-200 border-x-0 px-4 cursor-pointer hover:bg-slate-50"><LuUser size={25} /> Profile</Link>
              <div className="flex gap-2 text-lg py-2 px-4 cursor-pointer hover:bg-slate-50"><LuLogOut size={25}/> Logout</div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
