'use client';

// Add this at the top level to see if the module is being loaded
console.log('📄 AppointmentDetailsPage module is being loaded');

export default function AppointmentDetailsPage() {
  console.log('🚀 AppointmentDetailsPage component is rendering!');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">SUCCESS: AppointmentDetailsPage is rendering!</h1>
      <p className="text-lg">If you see this, the component is working!</p>
      <p className="text-sm text-gray-600">This is a simplified test version</p>
    </div>
  );
}