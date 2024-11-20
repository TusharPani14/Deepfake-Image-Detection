import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ResultDisplay from "./components/ResultDisplay";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleResult = (prediction) => {
    setResult(prediction);
    setImageUrl(prediction.image);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Deepfake Image Detection
      </h1>
      <div className="w-full max-w-xl bg-gray-800 shadow-lg rounded-lg p-8">
        <ImageUploader onResult={handleResult} />
        {result && <ResultDisplay result={result} imageUrl={imageUrl} />}
      </div>
    </div>
  );
}

export default App;
