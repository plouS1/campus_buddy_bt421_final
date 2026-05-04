import Avatar from './Avatar';
import { useApp } from '../context/useApp';

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ActivityCard({ post }) {
  const { toggleInterested } = useApp();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-enter">
      <div className="flex items-start gap-3">
        <Avatar initials={post.authorAvatar} color={post.authorAvatarColor} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-gray-900 text-sm">{post.authorName}</span>
            <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(post.timestamp)}</span>
          </div>
          <h3 className="font-bold text-gray-900 mt-1 text-base">{post.activity}</h3>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {post.location}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.time}
            </div>
          </div>
          {post.note && (
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{post.note}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {post.interested} {post.interested === 1 ? 'person' : 'people'} interested
            </span>
            <button
              onClick={() => toggleInterested(post.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                post.userInterested
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-50 text-indigo-600 active:bg-indigo-100'
              }`}
            >
              {post.userInterested ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  I'm in!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Join
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
