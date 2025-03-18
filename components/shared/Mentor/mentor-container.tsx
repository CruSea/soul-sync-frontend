'use client';

import { conversation, getMessages } from '@/actions/mentor/mentor';
import { toast } from '@/hooks/use-toast';
import { Conversation, Message, User } from '@/types/mentor';

import { useEffect, useState } from 'react';
import Chat from './Chat';
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

      setCurrentUser(user as User);

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

  const fetchConversationMessages = async (conversation_id: string) => {
    try {
      const messagedData = await getMessages(conversation_id);

      if (Array.isArray(messagedData) && messagedData.length > 0) {
        setConversationMessages(messagedData);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await conversation();
        console.log('conversation', response);
        const data: Conversation = await response;

        if (Array.isArray(data) && data.length > 0) {
          setConversations(data);
          console.log('user-9', data);
          fetchConversationMessages(data[0]?.conversation_id as string);
          setCurrentConversation(data);
        }
      } catch (error) {
        throw new Error(error as string);
      }
    };

    fetchConversation();
  }, [currentUser?.userId]);

  useEffect(() => {
    if (currentConversation?.conversation_id) {
      fetchConversationMessages(currentConversation.conversation_id);
    }
  }, [currentConversation]);

  return (
    <>
      <ConversationsList
        conversations={conversations}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
      {conversationMessages.length > 0 && (
        <Chat
          currentConversation={currentConversation}
          conversationMessages={conversationMessages}
        />
      )}
    </>
  );
};

export default MentorContainer;
