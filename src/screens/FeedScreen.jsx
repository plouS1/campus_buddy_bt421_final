import { useState } from 'react';
import { useApp } from '../context/useApp';
import ActivityCard from '../components/ActivityCard';
import PostComposer from '../components/PostComposer';
import BottomNav from '../components/BottomNav';
import Avatar from '../components/Avatar';

export default function FeedScreen() {
  const { posts, currentUser } = useApp();
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white px-5 pt-3 pb-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-gray-900">What's happening?</h1>
          <p className="text-xs text-gray-400">Campus activities near you</p>
        </div>
        {currentUser && (
          <Avatar initials={currentUser.avatar} color={currentUser.avatarColor} size="sm" />
        )}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-4 flex flex-col gap-3">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">🌱</div>
            <p className="text-gray-500 font-medium">Nothing yet</p>
            <p className="text-gray-400 text-sm mt-1">Be the first to post an activity!</p>
          </div>
        ) : (
          posts.map(post => <ActivityCard key={post.id} post={post} />)
        )}
        <div className="h-4" />
      </div>

      {/* FAB */}
      <button
        onClick={() => setComposerOpen(true)}
        className="absolute bottom-20 right-5 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center active:bg-indigo-700 transition-colors z-10"
      >
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <BottomNav />

      {composerOpen && <PostComposer onClose={() => setComposerOpen(false)} />}
    </div>
  );
}
