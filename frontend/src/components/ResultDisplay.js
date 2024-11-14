import React from 'react';

const ResultDisplay = ({ result }) => {
  return (
    <div className="mt-8 p-4 bg-gray-700 border-l-4 border-purple-500 text-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Prediction Result:</h2>
      <p className="text-lg">{result}</p>
    </div>
  );
};

export default ResultDisplay;
