"use client";

import { MentorContainerProps, User } from "@/types/mentor";
import Chat from "./Chat";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import UsersList from "./users-list";
import { Drawer, DrawerContent } from "./ProfileDrawer";
import { Sheet } from "lucide-react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USER_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

const MentorContainer = ({ users }: MentorContainerProps) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [userDetails, setUserDetails] = useState(null);
  const [userMessages, setUserMessages] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // fetches the userDetails from db
        const response = await fetch(
          `http://localhost:3001/userDetails?userId=${currentUser.userId}`
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
          `http://localhost:3001/userMessages?userId=${currentUser.userId}`
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
      } catch (error) {
        console.error("Failed to fetch user Messages:", error);
      }
    };

    if (currentUser && currentUser.userId) {
      fetchUserMesages();
      fetchUserDetails();
    }
  }, [currentUser]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
          const userObj = JSON.parse(user);
          const endPoint = `${BASE_URL}/${USER_URL}/${userObj.accounts[0].id}/user/${userObj.sub}`;
          const response = await fetch(endPoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          if (!response.ok) {
            console.error("Failed to fetch user info", response);
            throw new Error("Fetch failed");
          }

          const userInfo = await response.json();

          if (!userInfo) {
            console.error("userInfo doesn't exist",);
            throw new Error("userInfo not found");
          }

          if (!userInfo.location) {
            console.log("Redirecitng to mentor get started page");
            router.push("/mentor/get-started")
          }

          console.log("User exists: ", user);
        } else {
          console.error("User or token not found");
          router.push("/log-in");
        }
      } catch (error) {
        console.error("Error: ", error);
        router.push("/log-in");
      }
    };

    checkUser();
  }, [router])

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
      />
      <div className="hidden 3xl:block">
        <Profile userDetails={userDetails}/>
      </div>
    </>
  );
};

export default MentorContainer;
