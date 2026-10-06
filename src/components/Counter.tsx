import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="h-10 w-10 rounded-lg bg-slate-200 text-lg font-semibold hover:bg-slate-300"
        >
          −
        </button>
        <span className="min-w-12 text-center text-3xl font-bold tabular-nums">{count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="h-10 w-10 rounded-lg bg-indigo-500 text-lg font-semibold text-white hover:bg-indigo-600"
        >
          +
        </button>
      </div>
      <button
        onClick={() => setCount(0)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
