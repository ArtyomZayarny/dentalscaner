import React from 'react';

const procedures = [
  {
    name: 'Check-up',
    description: 'General dental health check',
    price: 'Free',
  },
  {
    name: 'Cleaning',
    description: 'Plaque removal, prevention',
    price: 'from €30',
  },
  {
    name: 'Caries treatment',
    description: 'Painless and stress-free',
    price: 'from €50',
  },
];

function ProcedurePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🦷 Procedures</h1>
      <p className="mb-6 text-gray-700">
        <span className="font-semibold">Goal:</span> Provide a brief overview of available services
        so people know what they can book.
      </p>
      <section className="bg-white rounded-lg shadow p-6 max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Available procedures</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3 font-medium">Procedure</th>
              <th className="text-left py-2 px-3 font-medium">Description</th>
              <th className="text-left py-2 px-3 font-medium">Price (opt.)</th>
              <th className="text-left py-2 px-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((proc, idx) => (
              <tr key={proc.name} className={idx !== procedures.length - 1 ? 'border-b' : ''}>
                <td className="py-2 px-3">{proc.name}</td>
                <td className="py-2 px-3">{proc.description}</td>
                <td className="py-2 px-3">{proc.price}</td>
                <td className="py-2 px-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 font-medium">
                    <span role="img" aria-label="book">
                      📝
                    </span>{' '}
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProcedurePage;
