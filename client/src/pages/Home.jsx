export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col">
      <h1 className="text-5xl font-bold mb-4">NiveshAI 🚀</h1>
      <p className="text-gray-400 mb-6">AI Powered Stock Platform</p>

      <a href="/dashboard" className="bg-blue-600 px-6 py-3 rounded-xl">
        Enter Dashboard
      </a>
    </div>
  );
}