import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/useApp';
import Avatar from '../components/Avatar';

export default function ChatThread({ conversation, onBack }) {
  const { sendMessage, markRead, conversations } = useApp();
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  // Use live conversation data
  const live = conversations.find(c => c.id === conversation.id) || conversation;

  useEffect(() => {
    markRead(conversation.id);
  }, [conversation.id, markRead]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [live.messages.length]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(conversation.id, trimmed);
    setText('');
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
        <button onClick={onBack} className="p-1 -ml-1 text-indigo-600 active:opacity-70">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Avatar initials={live.participantAvatar} color={live.participantAvatarColor} size="sm" />
        <span className="font-semibold text-gray-900 text-sm">{live.participantName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-4 flex flex-col gap-2">
        {live.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Avatar initials={live.participantAvatar} color={live.participantAvatarColor} size="lg" />
            <p className="text-gray-500 text-sm mt-3 font-medium">{live.participantName}</p>
            <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation!</p>
          </div>
        )}
        {live.messages.map(msg => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col gap-0.5 max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <input
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Message..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            text.trim() ? 'bg-indigo-600 active:bg-indigo-700' : 'bg-gray-200'
          }`}
        >
          <svg className={`w-4 h-4 ${text.trim() ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
