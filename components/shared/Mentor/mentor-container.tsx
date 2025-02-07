'use client';

import {
  MentorContainerProps,
  User,
  UserDetails,
  UserMessages,
} from '@/types/mentor';
import Profile from './profile';
import { useEffect, useState } from 'react';
import { jsonServer } from '@/data/end-points';
import { useRouter } from 'next/navigation';
import UsersList from './users-list';
import Chat from './chat';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USER_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

const MentorContainer = ({ users }: MentorContainerProps) => {
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [userMessages, setUserMessages] = useState<UserMessages>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // fetches the userDetails from db
        const response = await fetch(
          `${jsonServer.baseUrl}/${jsonServer.userDetails}?id=${currentUser.id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setUserDetails(data[0]); // Assuming you want the first item
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    const fetchUserMesages = async () => {
      try {
        const response = await fetch(
          `${jsonServer.baseUrl}/${jsonServer.messages}?id=${currentUser.id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setUserMessages(data[0]); // Assuming you want the first item
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    if (currentUser && currentUser.id) {
      fetchUserMesages();
      fetchUserDetails();
    }
  }, [currentUser]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
          const userObj = JSON.parse(user);
          // const endPoint = `${BASE_URL}/${USER_URL}/${userObj.accounts[0].id}/user/${userObj.sub}`;
          const endPoint = `${BASE_URL}/${USER_URL}/${userObj.sub}`;
          const response = await fetch(endPoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          if (!response.ok) {
            throw new Error('Fetch failed');
          }

          const userInfo = await response.json();

          if (!userInfo) {
            throw new Error('userInfo not found');
          }

          if (!userInfo.mentors[0].location) {
            router.push('/mentor/get-started');
          }
        } else {
          router.push('/log-in');
        }
      } catch (error) {
        router.push('/log-in');
      }
    };

    checkUser();
  }, [router]);

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
