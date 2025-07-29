import React from 'react';

function OverviewPage() {
  // Temporary mock data
  const userName = 'Name';
  const nextAppointment = {
    date: 'June 15',
    time: '10:00',
    clinic: 'Dash Dental Clinic',
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">👋 Hello, {userName}!</h1>
      <section className="bg-white rounded-lg shadow p-6 mb-6 max-w-xl">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🦷</span>
            <span className="font-semibold">Next appointment:</span>
          </div>
          <div className="pl-8 text-gray-700 mb-2">
            You are scheduled for: {nextAppointment.date}, {nextAppointment.time},{' '}
            {nextAppointment.clinic}
          </div>
          <div className="flex gap-4 mt-2">
            <button className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2 font-medium">
              <span role="img" aria-label="details">
                🔔
              </span>{' '}
              View details
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 font-medium">
              <span role="img" aria-label="calendar">
                📅
              </span>{' '}
              Book an appointment
            </button>
          </div>
        </div>
        {/* Optional content below */}
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <span className="mr-2">🗂️</span>
            <span className="text-gray-700">
              Status of recent appointments:
              <span className="font-medium">awaiting confirmation / completed</span>
            </span>
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2">🎯</span>
            <span className="text-gray-700">
              It&apos;s been more than 6 months since your last visit — time for a check-up!
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default OverviewPage;
