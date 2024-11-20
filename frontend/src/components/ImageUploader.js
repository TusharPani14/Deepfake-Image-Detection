import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onResult }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file)); // Set image preview
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      onResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className="w-full border-2 border-dashed border-gray-500 p-6 rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">Drag & drop an image here, or click to select one</p>
      </div>

      {/* Display selected image preview */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {selectedFile && (
        <p className="text-gray-300">Selected file: {selectedFile.name}</p>
      )}
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
        disabled={isLoading}
      >
        Upload and Predict
      </button>

      {/* Loader */}
      {isLoading && (
        <div className="flex items-center justify-center mt-4">
          <img
            src="/images/loader.gif"
            alt="Loading..."
            className="w-16 h-16"
          />
        </div>
      )}
    </form>
  );
};

export default ImageUploader;
