'use client';

import { Companion, Message } from '@prisma/client';
import { FC } from 'react';

import { ChatHeader } from '@/components/chat-header';

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
    </div>
  );
};

export { ChatClient };
