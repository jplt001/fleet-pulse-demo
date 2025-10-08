import React from 'react';

interface LoaderProps {
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ label = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center gap-3 text-gray-600">
      <div className="h-4 w-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 animate-pulse" />
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Loader;


