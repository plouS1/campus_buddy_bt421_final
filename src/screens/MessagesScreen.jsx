import { useState } from 'react';
import { useApp } from '../context/useApp';
import Avatar from '../components/Avatar';
import BottomNav from '../components/BottomNav';
import ChatThread from './ChatThread';

export default function MessagesScreen() {
  const { conversations } = useApp();
  const [openChat, setOpenChat] = useState(null);

  if (openChat) {
    return <ChatThread conversation={openChat} onBack={() => setOpenChat(null)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-3 pb-3 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Messages</h1>
        <p className="text-xs text-gray-400">{conversations.length} conversations</p>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-500 font-medium">No messages yet</p>
            <p className="text-gray-400 text-sm mt-1">Connect with people in Find to start chatting.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {conversations.map(convo => (
              <button
                key={convo.id}
                onClick={() => setOpenChat(convo)}
                className="w-full flex items-center gap-3 px-5 py-4 bg-white active:bg-gray-50 transition-colors text-left"
              >
                <div className="relative flex-shrink-0">
                  <Avatar initials={convo.participantAvatar} color={convo.participantAvatarColor} size="md" />
                  {convo.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {convo.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${convo.unread > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                      {convo.participantName}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{convo.lastTime}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${convo.unread > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                    {convo.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
