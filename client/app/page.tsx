import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Dentalscaner</h1>
        <p className="text-gray-700 mb-6">Welcome to the dental appointment system</p>
        <div className="space-y-4">
          <Link
            href="/sign-in"
            className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/test"
            className="block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Test Page
          </Link>
        </div>
      </div>
    </div>
  );
}
