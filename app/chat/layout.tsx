// app/chat/layout.tsx
import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return <div className="dark">{children}</div>;
};

export default ChatLayout;
