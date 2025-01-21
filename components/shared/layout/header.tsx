import { FiBell } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-base font-normal">{title}</h1>
      <div className="flex items-center space-x-4">
        <FiBell className="h-5 w-5 cursor-pointer" />
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="/assets/avatars/woman1.png"
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center text-xl">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
