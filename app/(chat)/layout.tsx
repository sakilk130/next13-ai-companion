import { FC, ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: FC<ChatLayoutProps> = ({ children }) => {
  return <div className="w-full h-full max-w-4xl mx-auto">{children}</div>;
};

export default ChatLayout;
