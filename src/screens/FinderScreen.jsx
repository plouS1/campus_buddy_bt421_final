import { useApp } from '../context/useApp';
import Avatar from '../components/Avatar';
import BottomNav from '../components/BottomNav';

export default function FinderScreen() {
  const { finderStudents, finderIndex, connectStudent, advanceFinder } = useApp();

  const remaining = finderStudents.slice(finderIndex);
  const current = remaining[0];
  const next = remaining[1];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-3 pb-3 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Find Friends</h1>
        <p className="text-xs text-gray-400">Connect with students who share your vibe</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-hidden">
        {remaining.length === 0 ? (
          <div className="text-center fade-in">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">You've seen everyone!</h2>
            <p className="text-gray-500 text-sm">Check Messages to catch up with your connections.</p>
          </div>
        ) : (
          <>
            {/* Card stack visual */}
            <div className="relative w-full max-w-xs" style={{ height: 420 }}>
              {/* Background card (next) */}
              {next && (
                <div
                  className="absolute inset-0 bg-white rounded-3xl shadow-md"
                  style={{ transform: 'scale(0.95) translateY(12px)', zIndex: 0 }}
                />
              )}

              {/* Foreground card (current) */}
              {current && (
                <div
                  key={current.id}
                  className="absolute inset-0 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-start p-6 card-enter"
                  style={{ zIndex: 1 }}
                >
                  <Avatar initials={current.avatar} color={current.avatarColor} size="xl" />
                  <h2 className="text-xl font-bold text-gray-900 mt-4">{current.name}</h2>
                  <p className="text-sm text-indigo-600 font-medium">{current.major}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{current.year}</p>

                  {current.bio && (
                    <p className="text-sm text-gray-600 text-center mt-3 leading-relaxed">{current.bio}</p>
                  )}

                  <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                    {current.interests.map(interest => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-300 mt-4">{remaining.length - 1} more to see</p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-6 mt-6">
              <button
                onClick={advanceFinder}
                className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => connectStudent(current.id)}
                className="w-16 h-16 rounded-full bg-indigo-600 shadow-md flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
            <div className="flex gap-12 mt-2">
              <span className="text-xs text-gray-400">Skip</span>
              <span className="text-xs text-indigo-500 font-medium">Connect</span>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
