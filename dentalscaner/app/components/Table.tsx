import React from 'react';

function Table() {
  return (
    <div className="max-w-4xl mt-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
        <thead>
          <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">Date</th>
            <th className="p-2 font-medium">Time</th>
            <th className="p-2 font-medium">Clinic</th>
            <th className="p-2 font-medium">Procedure</th>
            <th className="p-2 font-medium">Status</th>
            <th className="p-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          <tr className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
            <td className="p-2 min-w-45 pl-5">June 15, 2025</td>
            <td className="p-2">11:00 am</td>
            <td className="p-2">Canon Clinics</td>
            <td className="p-2">Routine Dental Check</td>
            <td className="p-2">Confimed</td>
            <td className="p-2">actions</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
