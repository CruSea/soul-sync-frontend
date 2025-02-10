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
import { Account } from '@/types/users';
import { userProfile } from '@/actions/auth/login';
import { checkUser, conversation } from '@/actions/mentor/mentor';
import { toast } from '@/hooks/use-toast';
const MentorContainer = () => {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const [userMessages, setUserMessages] = useState<UserMessages>();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const router = useRouter();
  
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
        setCurrentUser(userAccoutId as unknown as User );
        console.table(userAccoutId)
      };
      fetchUserProfile();
  }, []);
useEffect(()=>{
  if (currentUser && currentUser.id) {
    fetchUserMesages();
  }
},[currentUser])
  useEffect(() => {
    const fetchedUser = async () => {
      try {
          const response = await checkUser(currentUser?.userId as string);

          if (response.error) {
            toast({
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
