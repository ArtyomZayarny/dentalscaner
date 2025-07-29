import React from 'react';
import Topbar from './components/Topbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/clinic-preview.png')" }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60" />
        <form className="relative z-10 bg-white bg-opacity-90 rounded-xl shadow-lg p-10 flex flex-col items-center min-w-[340px] max-w-xs">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Sign in to Dentalscaner</h2>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-6 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
