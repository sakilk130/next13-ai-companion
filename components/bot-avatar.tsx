import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';

interface BotAvatarProps {
  src: string;
}

const BotAvatar: FC<BotAvatarProps> = ({ src }) => {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export { BotAvatar };
