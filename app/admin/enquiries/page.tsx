import React from 'react';

export default function EnquiriesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Enquiries</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage contact form submissions.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
          Enquiries table will go here.
        </div>
      </div>
    </div>
  );
}
