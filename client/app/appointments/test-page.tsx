'use client';

console.log('📄 TestPage module is being loaded');

export default function TestPage() {
  console.log('🚀 TestPage component is rendering!');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600">TEST: Static page is rendering!</h1>
      <p className="text-lg">If you see this, static routing works!</p>
      <p className="text-sm text-gray-600">This is a static test page</p>
    </div>
  );
}
