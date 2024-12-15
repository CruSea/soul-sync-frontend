"use client";

import { MentorContainerProps, User } from "@/types/mentor";
import Chat from "./Chat";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import UsersList from "./users-list";

const MentorContainer = ({ users }: MentorContainerProps) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  useEffect(() => {
    console.log("the current user", currentUser);
  }, [currentUser]);
  return (
    <>
      <UsersList
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Chat currentUser={currentUser} />
      <div className="w-96 h-full flex flex-col gap-5">
        <Profile type="user" currentUser={currentUser} />
      </div>
    </>
  );
};

export default MentorContainer;
