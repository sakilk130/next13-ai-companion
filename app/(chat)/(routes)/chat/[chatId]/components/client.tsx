'use client';

import { Companion, Message } from '@prisma/client';
import { FC, FormEvent, useState } from 'react';
import { useCompletion } from 'ai/react';
import { useRouter } from 'next/navigation';

import { ChatHeader } from '@/components/chat-header';
import { ChatForm } from '@/components/chat-form';

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient: FC<ChatClientProps> = ({ companion }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.messages);

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_prompt, completion) {
        const systemMessage = {
          role: 'system',
          content: completion,
        };
        setMessages((currentMessages) => [...currentMessages, systemMessage]);
        setInput('');
        router.refresh();
      },
    });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: 'user',
      content: input,
    };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <div>MESSAGES</div>
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export { ChatClient };
