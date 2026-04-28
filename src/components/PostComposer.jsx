import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PostComposer({ onClose }) {
  const { addPost } = useApp();
  const [form, setForm] = useState({ activity: '', location: '', time: '', note: '' });
  const [error, setError] = useState('');

  function handlePost() {
    if (!form.activity.trim()) { setError('Activity name is required'); return; }
    if (!form.location.trim()) { setError('Location is required'); return; }
    if (!form.time.trim()) { setError('Time is required'); return; }
    addPost(form);
    onClose();
  }

  const field = (key, placeholder, required = false) => (
    <div>
      <input
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        placeholder={placeholder + (required ? ' *' : '')}
        value={form[key]}
        onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setError(''); }}
      />
    </div>
  );

  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-3xl p-5 slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
        <h2 className="text-lg font-bold text-gray-900 mb-4">Post an Activity</h2>
        <div className="flex flex-col gap-3">
          {field('activity', 'Activity (e.g. Coffee at Blue Bottle)', true)}
          {field('location', 'Location', true)}
          {field('time', 'When? (e.g. Today at 3pm)', true)}
          <textarea
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
            placeholder="Add a note (optional)"
            rows={3}
            value={form.note}
            onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={handlePost}
            className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm active:bg-indigo-700 transition-colors"
          >
            Post Activity
          </button>
        </div>
      </div>
    </div>
  );
}
