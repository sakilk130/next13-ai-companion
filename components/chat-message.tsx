'use client';

import { Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { BeatLoader } from 'react-spinners';

import { BotAvatar } from '@/components/bot-avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatMessage: FC<ChatMessageProps> = ({
  role,
  content,
  isLoading,
  src,
}) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }
    navigator.clipboard.writeText(content);
    toast({
      description: 'Copied to clipboard',
    });
  };

  return (
    <div
      className={cn(
        'group flex items-start gap-x-3 py-4 w-full',
        role === 'user' && 'justify-end'
      )}
    >
      {role !== 'user' && src && <BotAvatar src={src} />}
      <div className="max-w-sm px-4 py-2 text-sm rounded-md bg-primary/10">
        {isLoading ? (
          <BeatLoader color={theme === 'light' ? 'black' : 'white'} size={5} />
        ) : (
          content
        )}
      </div>
      {role === 'user' && <UserAvatar />}
      {role !== 'user' && !isLoading && (
        <Button
          onClick={onCopy}
          className="transition opacity-0 group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export { ChatMessage };
