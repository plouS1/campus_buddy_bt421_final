export default function InterestTag({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
        selected
          ? 'bg-indigo-500 border-indigo-500 text-white'
          : 'bg-white border-gray-200 text-gray-600 active:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}
