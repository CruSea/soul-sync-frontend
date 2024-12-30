import { Separator } from '@/components/ui/separator';
import React from 'react';

interface NavProps {
  page: string;
}

const NavMenu: React.FC<NavProps> = ({ page }) => {
  return (
    <nav className="hidden lg:flex ml-11 justify-between items-center">
      <div className="flex h-20 items-center space-x-8">
        <div className="font-bold text-[40px] leading-[60px] tracking-[8px] font-logo">
          TURUMBA
        </div>
        <Separator orientation="vertical" />
        <div className="font-bold text-3xl">
          {page == 'user' ? 'Greetings User' : 'Greetings Mentor'}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
