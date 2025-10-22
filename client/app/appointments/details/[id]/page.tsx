'use client';

console.log('📄 AlternativeRoute module is being loaded');

export default function AlternativeRoute() {
  console.log('🚀 AlternativeRoute component is rendering!');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-purple-600">SUCCESS: Alternative route is rendering!</h1>
      <p className="text-lg">If you see this, alternative routing works!</p>
      <p className="text-sm text-gray-600">This is an alternative dynamic route</p>
    </div>
  );
}
