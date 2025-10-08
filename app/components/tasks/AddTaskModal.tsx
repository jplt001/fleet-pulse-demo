import React, { useState } from 'react';
import { X, Truck, Wrench, MapPin, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/taskSlice';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'trip' | 'maintenance' | 'inspection'>('trip');
  const [vehicle, setVehicle] = useState('');
  const [driver, setDriver] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new task object
    const newTask = {
      title,
      type,
      status: 'pending' as const,
      vehicle,
      driver,
      dueDate,
      description,
      priority,
    };

    // Dispatch action to add task
    dispatch(addTask(newTask));
    
    // Reset form
    setTitle('');
    setType('trip');
    setVehicle('');
    setDriver('');
    setDueDate('');
    setDescription('');
    setPriority('normal');
    
    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Modal form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Task title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>
          
          {/* Task type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                  type === 'trip' ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setType('trip')}
              >
                <MapPin className="w-5 h-5 mb-1" />
                <span className="text-sm">Trip</span>
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                  type === 'maintenance' ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setType('maintenance')}
              >
                <Wrench className="w-5 h-5 mb-1" />
                <span className="text-sm">Maintenance</span>
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                  type === 'inspection' ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setType('inspection')}
              >
                <AlertCircle className="w-5 h-5 mb-1" />
                <span className="text-sm">Inspection</span>
              </button>
            </div>
          </div>
          
          {/* Vehicle and driver */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle
              </label>
              <input
                type="text"
                id="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Vehicle ID"
                required
              />
            </div>
            <div>
              <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">
                Driver
              </label>
              <input
                type="text"
                id="driver"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Driver name"
                required
              />
            </div>
          </div>
          
          {/* Due date and priority */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task details..."
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;