export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8"
      style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)' }}
    >
      {/* Label above phone */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-xs">🎓</div>
        <span className="text-white font-semibold text-base tracking-wide">Campus Buddy</span>
        <span className="text-white/30 text-xs font-medium ml-1 border border-white/20 px-1.5 py-0.5 rounded-full">MVP</span>
      </div>

      {/* Phone shell */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 430,
          height: 932,
          background: '#1a1a1a',
          borderRadius: 54,
          boxShadow: `
            0 0 0 1px #333,
            0 0 0 2px #222,
            0 40px 80px rgba(0,0,0,0.8),
            inset 0 0 0 1px rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Side buttons — left (volume) */}
        <div className="absolute" style={{ left: -3, top: 160, width: 3, height: 36, background: '#333', borderRadius: '3px 0 0 3px' }} />
        <div className="absolute" style={{ left: -3, top: 210, width: 3, height: 56, background: '#333', borderRadius: '3px 0 0 3px' }} />
        <div className="absolute" style={{ left: -3, top: 280, width: 3, height: 56, background: '#333', borderRadius: '3px 0 0 3px' }} />
        {/* Side buttons — right (power) */}
        <div className="absolute" style={{ right: -3, top: 220, width: 3, height: 80, background: '#333', borderRadius: '0 3px 3px 0' }} />

        {/* Screen bezel */}
        <div
          className="absolute overflow-hidden bg-gray-50"
          style={{
            top: 12,
            left: 12,
            right: 12,
            bottom: 12,
            borderRadius: 44,
          }}
        >
          {/* Status bar */}
          <div
            className="flex-shrink-0 flex items-center px-6 bg-white"
            style={{ height: 44, position: 'relative', zIndex: 10 }}
          >
            <span className="text-xs font-semibold text-gray-900" style={{ fontSize: 13 }}>9:41</span>
            <div className="flex-1" />
            {/* Signal icons */}
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <div className="flex items-end gap-px h-3">
                {[4, 6, 8, 10, 12].map((h, i) => (
                  <div key={i} style={{ width: 3, height: h, background: i < 4 ? '#111' : '#ccc', borderRadius: 1 }} />
                ))}
              </div>
              {/* WiFi */}
              <svg width="15" height="12" viewBox="0 0 24 18" fill="none">
                <path d="M12 14.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#111"/>
                <path d="M6.4 11.1C7.9 9.6 9.9 8.7 12 8.7s4.1.9 5.6 2.4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2.3 7C4.9 4.4 8.3 3 12 3s7.1 1.4 9.7 4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-0.5">
                <div className="border border-gray-800 rounded-sm" style={{ width: 22, height: 11, padding: 1.5 }}>
                  <div className="bg-gray-900 rounded-sm h-full" style={{ width: '75%' }} />
                </div>
                <div className="bg-gray-700 rounded-sm" style={{ width: 2, height: 5 }} />
              </div>
            </div>
          </div>

          {/* Dynamic island / notch */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 34,
              background: '#000',
              borderRadius: 20,
              zIndex: 20,
            }}
          >
            {/* Front camera */}
            <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-800 mr-2" />
            {/* Sensor dot */}
            <div className="w-2 h-2 rounded-full" style={{ background: '#1a1a1a', border: '1px solid #333' }} />
          </div>

          {/* App content */}
          <div className="absolute inset-0" style={{ top: 44 }}>
            {children}
          </div>

          {/* Home indicator */}
          <div
            className="absolute flex items-center justify-center"
            style={{ bottom: 8, left: 0, right: 0, zIndex: 10, pointerEvents: 'none' }}
          >
            <div className="rounded-full bg-gray-400" style={{ width: 120, height: 5, opacity: 0.5 }} />
          </div>
        </div>
      </div>

      {/* Hint text below */}
      <p className="text-white/25 text-xs mt-5 text-center">
        Built with React + Vite · No backend needed
      </p>
    </div>
  );
}
