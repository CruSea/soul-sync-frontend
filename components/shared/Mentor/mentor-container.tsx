'use client';

import { endPoints, jsonServer } from '@/data/end-points';
import {
  Conversation,
  ConversationInfo,
  ConversationInfos,
  MentorContainerProps,
  Messages,
  UserMessages,
  WSMessage,
  WSSentMessage,
  webSocketMessages,
} from '@/types/mentor';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Chat from './Chat';
import ConversationsList from './conversations-list';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const USER_URL = process.env.NEXT_PUBLIC_API_ADMIN_URL;

const MentorContainer = ({ conversations }: MentorContainerProps) => {
  const [currentConversation, setCurrentConversation] = useState<Conversation>(
    conversations[0]
  );
  const [userMessages, setUserMessages] = useState<Messages>();
  const [webSocketMessages, setWebSocketMessages] = useState<webSocketMessages>(
    []
  );

  const WS_URL = 'https://1clr2kph-3002.uks1.devtunnels.ms';

  const token = localStorage.getItem('token') as string; // get token this way for the actual implementation
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMmVmMGQ2MS03YTMxLTRjZGMtYWJlNC1kN2VlYWQzNmY0ZGQiLCJlbWFpbCI6ImRlc3RhbmF0aG5hZWxhdGFyb0BnbWFpbC5jb20iLCJpbWFnZVVybCI6bnVsbCwiYWNjb3VudHMiOlt7ImlkIjoiYjBjMTU3YzgtYWYyMy00MzQ0LWE0MzctMTM0ZDIzYTYyNGE5IiwibmFtZSI6Im5hdGhuYWVsIiwiZG9tYWluIjpudWxsfV0sInJvbGVzIjpbIk9XTkVSIl0sImlhdCI6MTczNDk0Mjg5OCwiZXhwIjoxNzM0OTQ2NDk4fQ.S5nSDy3zYmG926BAYaqDWnp0lsGq8scr1t6Db41m1wM';

  const { sendJsonMessage, lastJsonMessage } = useWebSocket<
    WSMessage | WSSentMessage
  >(WS_URL, {
    share: true,
    queryParams: { token: token },
  });

  // Effect to log lastJsonMessage
  useEffect(() => {
    if (lastJsonMessage) {
      setWebSocketMessages((prevMessages) => [
        // store all the messages recieved by the us
        ...prevMessages,
        lastJsonMessage,
      ]);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    console.log('messages', webSocketMessages);
  }, [webSocketMessages]);

  useEffect(() => {
    const fetchUserMesages = async () => {
      try {
        // const response = await fetch(
        //  `${jsonServer.baseUrl}/${jsonServer.thread}?id=${currentConversation.conversation_id}` // for when connecting to local db server
        // );

        const response = await fetch(
          // for when connecting to backend
          `${BASE_URL}/${endPoints.threads}/${currentConversation.conversation_id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // setUserMessages(data[0].messages); // for when connecting to json server
          setUserMessages(data); // for when connecting to backend
        } else {
          console.warn('No user details found');
        }
      } catch (error) {
        console.error('Failed to fetch user Messages:', error);
      }
    };

    if (currentConversation && currentConversation.conversation_id) {
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
        sendJsonMessage={sendJsonMessage}
        conversationMessages={webSocketMessages.filter((message) =>
          'conversationId' in message // if it is a recieved message or sent message
            ? message.conversationId === currentConversation.conversation_id
            : message.metadata.conversationId ===
              currentConversation.conversation_id
        )}
      />
    </>
  );
};

export default MentorContainer;
