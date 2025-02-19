'use client';

import { checkUser, conversation, getMessages } from '@/actions/mentor/mentor';
import { toast } from '@/hooks/use-toast';
import { Conversation, Message, User, UserMessages } from '@/types/mentor';
import router from 'next/router';
import { useEffect, useState } from 'react';
import Chat from './chat';
import ConversationsList from './conversations-list';
import { userProfile } from '@/actions/auth/login';
const MentorContainer = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation>();
  const [conversationMessages, setConversationMessages] = useState<Message[]>(
    []
  );

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
    const fetchConversation = async () => {
      try {
        const response = await conversation();
        console.log('conversation', response);
        const data = await response;

        if (Array.isArray(data) && data.length > 0) {
          setConversations((prevConversations) => [
            ...prevConversations,
            ...data,
          ]);
          setCurrentConversation(data[0]);
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    if (currentUser && currentUser.userId) {
      fetchConversation();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchConversationMessages = async (conversation: Conversation) => {
      try {
        const messagedData = await getMessages(conversation.conversation_id);
        if (Array.isArray(messagedData) && messagedData.length > 0) {
          setConversationMessages(messagedData);
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    if (currentUser && currentConversation) {
      fetchConversationMessages(currentConversation);
    }
  }, [currentConversation]);

  return (
    <>
      <ConversationsList
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
      <Chat
        currentConversation={currentConversation}
        conversationMessages={conversationMessages}
      />
    </>
  );
};

export default MentorContainer;
