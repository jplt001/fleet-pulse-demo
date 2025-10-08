import React from 'react';
import { Truck, Wrench, MapPin, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  type: 'trip' | 'maintenance' | 'inspection';
  status: 'active' | 'completed' | 'pending';
  vehicle: string;
  driver: string;
  dueDate: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  onClick: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  type,
  status,
  vehicle,
  driver,
  dueDate,
  priority,
  onClick
}) => {
  // Get icon based on task type
  const getIcon = () => {
    switch (type) {
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
    switch (status) {
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

  // Get priority gradient
  const getPriorityGradient = () => {
    switch (priority) {
      case 'urgent':
        return 'from-red-500 to-orange-500';
      case 'high':
        return 'from-orange-500 to-yellow-500';
      case 'normal':
        return 'from-blue-500 to-indigo-500';
      case 'low':
        return 'from-teal-500 to-blue-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      className="task-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 p-6 mb-4 cursor-pointer"
      onClick={() => onClick(id)}
    >
      {/* Gradient accent bar */}
      <div className={`gradient-accent h-1 rounded-t-2xl bg-gradient-to-r ${getPriorityGradient()}`}></div>
      
      <div className="card-content">
        {/* Card header with icon, type and status */}
        <div className="card-header flex justify-between items-center mb-2">
          <div className="task-icon-type flex items-center">
            <div className="icon text-gray-700 mr-2">
              {getIcon()}
            </div>
            <span className="task-type text-sm font-medium text-gray-600 capitalize">
              {type}
            </span>
          </div>
          <div className={`status-indicator w-3 h-3 rounded-full ${getStatusColor()}`}></div>
        </div>
        
        {/* Task title */}
        <h3 className="task-title text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        {/* Vehicle and driver assignment */}
        <div className="task-assignment text-md text-gray-700 mb-3">
          {vehicle} • {driver}
        </div>
        
        {/* Due date */}
        <div className="task-details flex justify-between items-center">
          <span className="due-date text-sm text-gray-600">
            Due: {dueDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;