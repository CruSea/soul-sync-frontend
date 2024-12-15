"use client";

import { MentorContainerProps, User } from "@/types/mentor";
import Chat from "./Chat";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import UsersList from "./users-list";

const MentorContainer = ({ users }: MentorContainerProps) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [userDetails, setUserDetails] = useState(null);
  const [userMessages, setUserMessages] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // fetches the userDetails from db
        const response =
        await fetch(`http://localhost:3001/userDetails?userId=${currentUser.userId}`); 

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setUserDetails(data[0]); // Assuming you want the first item
        } else {
          console.warn("No user details found");
        }

      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    const fetchUserMesages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/userMessages?userId=${currentUser.userId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setUserMessages(data[0]); // Assuming you want the first item
        } else {
          console.warn("No user details found");
        }
        console.log("the userMessages", data[0]);  
      } catch (error) {
        console.error("Failed to fetch user Messages:", error);
      }
    }

    if (currentUser && currentUser.userId) {
      fetchUserMesages();
    }
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
        <Profile
          type="user"
          currentUser={currentUser}
          userDetails={userDetails}
        />
      </div>
    </>
  );
};

export default MentorContainer;
