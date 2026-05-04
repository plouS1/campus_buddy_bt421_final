import { useState } from 'react';
import { useApp } from '../context/useApp';
import Avatar from '../components/Avatar';
import InterestTag from '../components/InterestTag';
import BottomNav from '../components/BottomNav';
import { INTERESTS, MAJORS, YEARS } from '../data/mockData';

export default function ProfileScreen() {
  const { currentUser, updateProfile, connections, posts } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);

  function startEdit() {
    setForm({ ...currentUser });
    setEditing(true);
  }

  function cancelEdit() {
    setForm(null);
    setEditing(false);
  }

  function saveEdit() {
    updateProfile(form);
    setEditing(false);
    setForm(null);
  }

  function toggleInterest(tag) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter(i => i !== tag)
        : [...prev.interests, tag],
    }));
  }

  const myPosts = posts.filter(p => p.authorId === 'me');

  if (editing && form) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white px-5 pt-3 pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <button onClick={cancelEdit} className="text-gray-500 text-sm">Cancel</button>
          <h1 className="text-base font-bold text-gray-900">Edit Profile</h1>
          <button onClick={saveEdit} className="text-indigo-600 font-semibold text-sm">Save</button>
        </div>
        <div className="flex-1 overflow-y-auto phone-scroll px-5 py-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Name</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Major</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={form.major}
              onChange={e => setForm(p => ({ ...p, major: e.target.value }))}
            >
              {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Year</label>
            <div className="flex flex-wrap gap-2">
              {YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => setForm(p => ({ ...p, year: y }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    form.year === y ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-200 text-gray-600 bg-white'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(tag => (
                <InterestTag
                  key={tag}
                  label={tag}
                  selected={form.interests.includes(tag)}
                  onClick={() => toggleInterest(tag)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-3 pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Profile</h1>
        <button
          onClick={startEdit}
          className="text-sm text-indigo-600 font-semibold px-3 py-1.5 bg-indigo-50 rounded-lg active:bg-indigo-100 transition-colors"
        >
          Edit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll px-5 py-5">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <Avatar initials={currentUser?.avatar} color={currentUser?.avatarColor} size="xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
              <p className="text-sm text-indigo-600 font-medium mt-0.5">{currentUser?.major}</p>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">{currentUser?.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">{currentUser?.year}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {currentUser?.interests?.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Connections', value: connections.length },
            { label: 'Posts', value: myPosts.length },
            { label: 'Joined', value: 'Today' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My posts */}
        {myPosts.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-bold text-gray-700 mb-3">Your Posts</p>
            <div className="flex flex-col gap-2">
              {myPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">{post.activity}</p>
                  <p className="text-xs text-gray-500 mt-1">{post.time} · {post.location}</p>
                  <p className="text-xs text-indigo-500 mt-1">{post.interested} interested</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>

      <BottomNav />
    </div>
  );
}
