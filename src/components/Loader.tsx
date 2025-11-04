// src/components/Loader.jsx

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-[9999]">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium">Loading...</p>
    </div>
  );
}
