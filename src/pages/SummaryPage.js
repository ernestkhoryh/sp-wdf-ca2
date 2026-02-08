import React from 'react';


// Summary of Execution Page
const SummaryPage = ({ changeLog, onReturnToMain }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Summary of Execution</h1>
        
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Changes Made</h2>
          
          {changeLog.length === 0 ? (
            <p className="text-gray-500">No changes have been made yet.</p>
          ) : (
            <ul className="space-y-3">
              {changeLog.map((log, index) => (
                <li key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      log.action === 'Added' ? 'bg-green-100 text-green-800' :
                      log.action === 'Deleted' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.action}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{log.description}</p>
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <button
          onClick={onReturnToMain}
          className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-red-700 transition font-semibold"
        >
          Return to Menu Management
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;