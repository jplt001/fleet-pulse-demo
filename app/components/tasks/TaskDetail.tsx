import React from 'react';
import { X, Truck, Wrench, MapPin, AlertCircle, Calendar, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTask } from '../../store/slices/taskSlice';
import type { RootState } from '../../store';

const TaskDetail: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);

  const handleClose = () => {
    dispatch(selectTask(null));
  };

  // Get icon based on task type
  const getIcon = () => {
    if (!selectedTask) return null;
    
    switch (selectedTask.type) {
      case 'trip':
        return <MapPin className="w-5 h-5" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5" />;
      case 'inspection':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Truck className="w-5 h-5" />;
    }
  };

  // Get status color
  const getStatusColor = () => {
    if (!selectedTask) return '';
    
    switch (selectedTask.status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'active':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status text
  const getStatusText = () => {
    if (!selectedTask) return '';
    
    switch (selectedTask.status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'active':
        return 'Active';
      default:
        return 'Unknown';
    }
  };

  if (!selectedTask) return null;

  return (
    <div className="task-detail-panel bg-white rounded-2xl shadow-xl p-6 h-fit animate-in slide-in-from-right duration-300">
      {/* Panel header */}
      <div className="panel-header flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
        <button 
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Panel content */}
      <div className="panel-content">
        {/* Task type and status */}
        <div className="task-type-status flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="icon text-gray-700 mr-2">
              {getIcon()}
            </div>
            <span className="task-type text-lg font-medium text-gray-900 capitalize">
              {selectedTask.type}
            </span>
          </div>
          <div className="flex items-center">
            <span className={`status-indicator w-3 h-3 rounded-full ${getStatusColor()} mr-2`}></span>
            <span className="status-text text-sm font-medium text-gray-700">
              {getStatusText()}
            </span>
          </div>
        </div>
        
        {/* Task title */}
        <h3 className="task-title text-2xl font-bold text-gray-900 mb-2">
          {selectedTask.title}
        </h3>
        
        {/* Task info */}
        <div className="task-info space-y-4 mb-6">
          <div className="info-item flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <label className="text-sm text-gray-500">Assigned To</label>
              <span className="block text-gray-900">{selectedTask.driver}</span>
            </div>
          </div>
          <div className="info-item flex items-center">
            <Truck className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <label className="text-sm text-gray-500">Vehicle</label>
              <span className="block text-gray-900">{selectedTask.vehicle}</span>
            </div>
          </div>
          <div className="info-item flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <label className="text-sm text-gray-500">Due Date</label>
              <span className="block text-gray-900">{selectedTask.dueDate}</span>
            </div>
          </div>
        </div>
        
        {/* Task description */}
        {selectedTask.description && (
          <div className="task-description mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{selectedTask.description}</p>
          </div>
        )}
        
        {/* Task history */}
        <div className="task-history">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Log</h3>
          <ul className="history-list space-y-2">
            <li className="history-item text-sm text-gray-700">
              Task created on {selectedTask.dueDate}
            </li>
            <li className="history-item text-sm text-gray-700">
              Assigned to {selectedTask.driver}
            </li>
            {selectedTask.status === 'completed' && (
              <li className="history-item text-sm text-gray-700">
                Marked as completed
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;