// src/components/ui/progress.jsx

export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}