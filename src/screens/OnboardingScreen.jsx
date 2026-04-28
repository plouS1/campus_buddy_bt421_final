import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { INTERESTS, MAJORS, YEARS } from '../data/mockData';
import InterestTag from '../components/InterestTag';

export default function OnboardingScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', major: '', year: '', interests: [] });
  const [error, setError] = useState('');

  function toggleInterest(tag) {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter(i => i !== tag)
        : [...prev.interests, tag],
    }));
    setError('');
  }

  function handleNext() {
    if (step === 1) {
      if (!form.name.trim()) { setError('Enter your name'); return; }
      if (!form.major) { setError('Select your major'); return; }
      if (!form.year) { setError('Select your year'); return; }
      setError('');
      setStep(2);
    } else {
      if (form.interests.length < 3) { setError('Pick at least 3 interests'); return; }
      login(form);
      navigate('/feed');
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-12 pb-8 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">🎓</span>
          </div>
          <span className="text-white font-bold text-lg">Campus Buddy</span>
        </div>
        <p className="text-indigo-100 text-sm mt-1">Find your people on campus</p>

        {/* Step indicator */}
        <div className="flex gap-2 mt-5">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all ${s <= step ? 'bg-white w-8' : 'bg-white/30 w-4'}`}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto phone-scroll px-6 py-6">
        {step === 1 ? (
          <div className="fade-in flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">Tell us about yourself</h2>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Your Name</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                placeholder="First Last"
                value={form.name}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setError(''); }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Major</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white"
                value={form.major}
                onChange={e => { setForm(p => ({ ...p, major: e.target.value })); setError(''); }}
              >
                <option value="">Select major...</option>
                {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Year</label>
              <div className="flex flex-wrap gap-2">
                {YEARS.map(y => (
                  <button
                    key={y}
                    onClick={() => { setForm(p => ({ ...p, year: y })); setError(''); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      form.year === y
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-gray-200 text-gray-600 bg-white active:bg-gray-50'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="fade-in flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">What are you into?</h2>
              <p className="text-sm text-gray-500 mt-1">Pick at least 3 interests to find your crowd</p>
            </div>
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
            <p className="text-xs text-indigo-500 font-medium">{form.interests.length} selected</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 flex-shrink-0 bg-white border-t border-gray-50">
        {error && <p className="text-xs text-red-500 mb-3 text-center">{error}</p>}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-sm active:bg-indigo-700 transition-colors"
        >
          {step === 1 ? 'Continue' : 'Join Campus Buddy 🎉'}
        </button>
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="w-full text-gray-400 text-sm mt-3 py-1"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
