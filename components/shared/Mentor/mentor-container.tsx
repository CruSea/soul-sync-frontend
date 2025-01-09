'use client';

import {
  Conversation,
  MentorContainerProps,
  UserMessages,
  WSMessage,
} from '@/types/mentor';
import Chat from './Chat';
import Profile from './Profile';
import { useEffect, useState } from 'react';
import UsersList from './conversations-list';
import { jsonServer } from '@/data/end-points';
import { useRouter } from 'next/navigation';
import ConversationsList from './conversations-list';
import useWebSocket from 'react-use-websocket';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USER_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

const MentorContainer = ({ conversations }: MentorContainerProps) => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    conversations[0]
  );
  const [userMessages, setUserMessages] = useState<UserMessages>();
  const [socket, setSocket] = useState({});       // // the web socket information that we will get from the messages

  const WS_URL = 'ws://localhost:8000';

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<WSMessage>(WS_URL, {
    share: true,
    queryParams: { userId: '76f8af8a-a765-448c-b680-c77307f62794' }, // replace by actual userId of the mentor in the future
  });

  // Effect to log lastJsonMessage
  useEffect(() => {
    if (Object.entries(socket).length === 0 && lastJsonMessage) {
      const messageSocket = lastJsonMessage.socket;
      setSocket((prevSocket) => {
        return {...messageSocket}   // we store the socket information that we got from the message
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const fetchUserMesages = async () => {
      try {
        const response = await fetch(
          `${jsonServer.baseUrl}/${jsonServer.thread}?id=${currentConversation.id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setUserMessages(data[0]); // Assuming you want the first item
        } else {
          console.warn('No user details found');
        }
      } catch (error) {
        console.error('Failed to fetch user Messages:', error);
      }
    };

    if (currentConversation && currentConversation.id) {
      fetchUserMesages();
    }
  }, [currentConversation]);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const user = localStorage.getItem('user');
  //       const token = localStorage.getItem('token');

  //       if (user && token) {
  //         const userObj = JSON.parse(user);
  //         // const endPoint = `${BASE_URL}/${USER_URL}/${userObj.accounts[0].id}/user/${userObj.sub}`;
  //         const endPoint = `${BASE_URL}/${USER_URL}/${userObj.sub}`;
  //         const response = await fetch(endPoint, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${JSON.parse(token)}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           console.error('Failed to fetch user info', response);
  //           throw new Error('Fetch failed');
  //         }

  //         const userInfo = await response.json();

  //         if (!userInfo) {
  //           console.error("userInfo doesn't exist");
  //           throw new Error('userInfo not found');
  //         }

  //         if (!userInfo.mentors[0].location) {
  //           router.push('/mentor/get-started');
  //         }
  //       } else {
  //         console.error('User or token not found');
  //         router.push('/log-in');
  //       }
  //     } catch (error) {
  //       console.error('Error: ', error);
  //       router.push('/log-in');
  //     }
  //   };

  //   checkUser();
  // }, [router]);

  return (
    <>
      <ConversationsList
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
      <Chat
        currentConversation={currentConversation}
        userMessages={userMessages}
        setUserMessages={setUserMessages}
        sendJsonMessage={sendJsonMessage}
      />
      {/* <div className="hidden 3xl:block">
        <Profile userDetails={userDetails} />
      </div> */}
    </>
  );
};

export default MentorContainer;
