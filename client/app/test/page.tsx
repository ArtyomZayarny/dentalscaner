export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Test Page</h1>
        <p className="text-gray-700">If you can see this, Next.js is working!</p>
        <div className="mt-4">
          <a 
            href="/sign-in" 
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Go to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
