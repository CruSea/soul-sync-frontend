import { FiBell } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FiBell className="h-5 w-5" />
        </button>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt="User avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
