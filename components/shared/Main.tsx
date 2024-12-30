'use client';

import Search from './Search';
import Chat from './Chat';
import Profile from './Profile';
import React from 'react';

interface MainProps {
  page: string;
}

const Main: React.FC<MainProps> = ({ page }) => {
  return (
    <div className="flex-1 flex p-5 gap-5 w-full overflow-hidden bg-gray-100">
      <Search />
      <Chat
        toggleProfileInView={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <div className="w-96 h-full flex flex-col gap-5">
        {page == 'user' ? (
          <Profile type="mentor" />
        ) : (
          <>
            <Profile type="user" />
            <Profile type="agent" />
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
