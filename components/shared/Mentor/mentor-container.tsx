"use client";

import { MentorContainerProps, User, UserDetails, UserMessages } from "@/types/mentor";
import Chat from "./Chat";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import UsersList from "./users-list";
import { jsonServer } from "@/data/end-points";

const MentorContainer = ({ users }: MentorContainerProps) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [userMessages, setUserMessages] = useState<UserMessages>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // fetches the userDetails from db
        const response = await fetch(
          `${jsonServer.baseUrl}/${jsonServer.userDetails}?id=${currentUser.id}`
        );

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
        const response = await fetch(
          `${jsonServer.baseUrl}/${jsonServer.messages}?id=${currentUser.id}`
        );

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
    };

    if (currentUser && currentUser.id) {
      fetchUserMesages();
      fetchUserDetails();
    }
  }, [currentUser]);

  return (
    <>
      <UsersList
        users={users}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Chat
        userMessages={userMessages}
        toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        userDetails={userDetails}
        setUserMessages={setUserMessages}
      />
      <div className="hidden 3xl:block">
        <Profile userDetails={userDetails} />
      </div>
    </>
  );
};

export default MentorContainer;