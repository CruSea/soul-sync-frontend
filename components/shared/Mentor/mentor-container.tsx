'use client';

import { checkUser, conversation } from '@/actions/mentor/mentor';
import { toast } from '@/hooks/use-toast';
import { Conversation, User, UserMessages } from '@/types/mentor';
import router from 'next/router';
import { useEffect, useState } from 'react';
import Chat from './Chat';
import ConversationsList from './conversations-list';
import { userProfile } from '@/actions/auth/login';
const MentorContainer = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userMessages, setUserMessages] = useState<UserMessages>();
  const [conversations, setConversations] = useState<Conversation[]>([]); 
  const [currentConversation, setCurrentConversation] = useState<Conversation>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await userProfile();
      setCurrentUser(user as unknown as User);

      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: 'User not found',
        });
      }
    };
    fetchUserProfile();
  }, []);


  useEffect(() => {
    const fetchUserMesages = async () => {
      try {
        const response = await conversation();
        console.log("message", response)
        const data = await response;
  
        if (Array.isArray(data) && data.length > 0) {
          setConversations((prevConversations => [...prevConversations, data[0]]));
          setCurrentConversation(data[0]);
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    if (currentUser && currentUser.userId) {
      fetchUserMesages();
    }
  }, [currentUser]);



  const token = localStorage.getItem('token') as string; // get token this way for the actual implementation
  // const WS_URL = 'https://1clr2kph-3002.uks1.devtunnels.ms';
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMmVmMGQ2MS03YTMxLTRjZGMtYWJlNC1kN2VlYWQzNmY0ZGQiLCJlbWFpbCI6ImRlc3RhbmF0aG5hZWxhdGFyb0BnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiYjBjMTU3YzgtYWYyMy00MzQ0LWE0MzctMTM0ZDIzYTYyNGE5IiwibmFtZSI6Im5hdGhuYWVsIiwiZG9tYWluIjpudWxsfV0sInJvbGVzIjpbIk9XTkVSIl0sImlhdCI6MTczNDk0Mjg5OCwiZXhwIjoxNzM0OTQ2NDk4fQ.S5nSDy3zYmG926BAYaqDWnp0lsGq8scr1t6Db41m1wM';





  return (
    <>
      <ConversationsList
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
      {/* <Chat
        currentConversation={currentConversation}
        userMessages={userMessages}
        // sendJsonMessage={sendJsonMessage}
        currentConversationMessages={currentConversationMessages}
        socket={socket}
        setWebSocketMessages={setWebSocketMessages}
      /> */}
    </>
  );
};

export default MentorContainer;
