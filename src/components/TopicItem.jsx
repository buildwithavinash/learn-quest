const TopicItem = ({ topic, completed, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center gap-3 p-3 text-left rounded-lg cursor-pointer transition
      ${completed ? "bg-green-900/40" : "bg-slate-800 hover:bg-slate-700"}`}
    >
      <div
        className={`w-5 h-5 flex items-center shrink-0 justify-center rounded border
        ${completed ? "bg-green-500 border-green-500" : "border-gray-400"}`}
      >
        {completed && (
          <span className="text-xs text-black font-bold">✓</span>
        )}
      </div>

      <span
        className={`text-sm ${
          completed ? "line-through text-gray-400" : "text-gray-200"
        }`}
      >
        {topic}
      </span>
    </button>
  );
};

export default TopicItem;
