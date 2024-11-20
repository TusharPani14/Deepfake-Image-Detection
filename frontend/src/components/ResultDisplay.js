import React from 'react';

const ResultDisplay = ({ result, imageUrl }) => {
  return (
    <div className="mt-8 p-4 bg-gray-700 border-l-4 border-purple-500 text-gray-100 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Prediction Result:</h2>
      
      {/* Display the uploaded image */}
      {imageUrl && (
        <div className="my-4">
          <img
            src={imageUrl}
            alt="Prediction"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Display the prediction results */}
      <p className="text-lg mb-2">Label: {result.label}</p>
      <p className="text-lg">Confidence Score: {(result.score * 100).toFixed(2)}%</p>
    </div>
  );
};

export default ResultDisplay;
