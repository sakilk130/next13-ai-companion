'use client';

import { Companion } from '@prisma/client';
import { ElementRef, FC, useEffect, useRef, useState } from 'react';

import { ChatMessage, ChatMessageProps } from '@/components/chat-message';

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  companion,
  isLoading,
  messages = [],
}) => {
  const scrollRef = useRef<ElementRef<'div'>>(null);

  const [fakeLoading, setFakeLoading] = useState<boolean>(
    messages.length === 0 ? true : false
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 pr-4 overflow-y-auto">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          src={companion.src}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading && <ChatMessage src={companion.src} role="system" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export { ChatMessages };
