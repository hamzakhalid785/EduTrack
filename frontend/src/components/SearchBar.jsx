function SearchBar({ value, onChange }) {
  return (
    <div className="relative">

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search students by name or email..."
        className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>

    </div>
  );
}

export default SearchBar;