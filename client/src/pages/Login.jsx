export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input className="w-full mb-3 p-2 bg-gray-700" placeholder="Email" />
        <input className="w-full mb-3 p-2 bg-gray-700" placeholder="Password" />

        <button className="bg-blue-600 w-full py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}