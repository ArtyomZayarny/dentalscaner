import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 p-6  rounded-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Welcome to Dentalscaner</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
              card: 'shadow-lg',
            },
          }}
        />
      </div>
    </div>
  );
}
