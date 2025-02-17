'use client';

import { User, UserDetails, UserMessages } from '@/types/mentor';
import Profile from './Profile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UsersList from './users-list';
import Chat from './Chat';
import { userProfile } from '@/actions/auth/login';
import { checkUser, conversation } from '@/actions/mentor/mentor';
import { toast } from '@/hooks/use-toast';
const MentorContainer = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [userMessages, setUserMessages] = useState<UserMessages>();

  // const WS_URL = 'https://1clr2kph-3002.uks1.devtunnels.ms';

  const token = localStorage.getItem('token') as string; // get token this way for the actual implementation
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMmVmMGQ2MS03YTMxLTRjZGMtYWJlNC1kN2VlYWQzNmY0ZGQiLCJlbWFpbCI6ImRlc3RhbmF0aG5hZWxhdGFyb0BnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiYjBjMTU3YzgtYWYyMy00MzQ0LWE0MzctMTM0ZDIzYTYyNGE5IiwibmFtZSI6Im5hdGhuYWVsIiwiZG9tYWluIjpudWxsfV0sInJvbGVzIjpbIk9XTkVSIl0sImlhdCI6MTczNDk0Mjg5OCwiZXhwIjoxNzM0OTQ2NDk4fQ.S5nSDy3zYmG926BAYaqDWnp0lsGq8scr1t6Db41m1wM';

  const fetchUserMesages = async () => {
    try {
      const response = await conversation();

      const data = await response;

      if (Array.isArray(data) && data.length > 0) {
        setUserMessages(data[0]); // Assuming you want the first item
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccoutId = await userProfile();
      setCurrentUser(userAccoutId as unknown as User);
      console.table(userAccoutId);
    };
    fetchUserProfile();
  }, []);
  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchUserMesages();
    }
  }, [currentUser]);
  useEffect(() => {
    const fetchedUser = async () => {
      try {
        const response = await checkUser(currentUser?.userId as string);

        if (response.error) {
          toast({
            variant: 'destructive',
            title: 'Error!',
            description: response.error.description,
          });
        }

        if (!response.mentors[0].location) {
          router.push('/mentor/get-started');
        }
      } catch (error) {
        // router.push('/log-in');
      }
    };

    fetchedUser();
  }, [router]);

  return (
    <>
      <UsersList
        users={currentUser as unknown as User[]}
        currentUser={currentUser as User}
        setCurrentUser={setCurrentUser}
      />
      <Chat
        currentConversation={currentConversation}
        userMessages={userMessages}
        // sendJsonMessage={sendJsonMessage}
        currentConversationMessages={currentConversationMessages}
        socket={socket}
        setWebSocketMessages={setWebSocketMessages}
      />
    </>
  );
};

export default MentorContainer;
