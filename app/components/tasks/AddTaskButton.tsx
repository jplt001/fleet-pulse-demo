import React from 'react';
import { PlusCircle } from 'lucide-react';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 animate-pulse"
      onClick={onClick}
      aria-label="Add new task"
    >
      <PlusCircle className="w-6 h-6" />
    </button>
  );
};

export default AddTaskButton;