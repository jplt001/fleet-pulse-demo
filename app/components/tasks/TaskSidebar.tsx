import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/taskSlice';
import type { RootState } from '../../store';

const TaskSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, tasks } = useSelector((state: RootState) => state.tasks);

  // Count tasks by status
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => task.status === 'active').length,
    maintenance: tasks.filter(task => task.type === 'maintenance').length,
    completed: tasks.filter(task => task.status === 'completed').length,
  };

  const handleFilterChange = (newFilter: 'all' | 'active' | 'maintenance' | 'completed') => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="task-sidebar w-full md:w-64 lg:w-72 p-6 bg-white rounded-2xl shadow-md h-fit">
      {/* Search container */}
      <div className="search-container mb-6">
        <input
          type="text"
          className="search-input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
        />
        <button className="clear-button mt-2 text-sm text-blue-500 hover:text-blue-700">
          Clear
        </button>
      </div>

      {/* Filter categories */}
      <div className="filter-categories">
        <div 
          className={`category cursor-pointer p-3 rounded-lg mb-2 flex justify-between items-center ${
            filter === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleFilterChange('all')}
        >
          <span>All Tasks</span>
          <span className="count bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
            {taskCounts.all}
          </span>
        </div>
        <div 
          className={`category cursor-pointer p-3 rounded-lg mb-2 flex justify-between items-center ${
            filter === 'active' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleFilterChange('active')}
        >
          <span>Active</span>
          <span className="count bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
            {taskCounts.active}
          </span>
        </div>
        <div 
          className={`category cursor-pointer p-3 rounded-lg mb-2 flex justify-between items-center ${
            filter === 'maintenance' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleFilterChange('maintenance')}
        >
          <span>Maintenance</span>
          <span className="count bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
            {taskCounts.maintenance}
          </span>
        </div>
        <div 
          className={`category cursor-pointer p-3 rounded-lg mb-2 flex justify-between items-center ${
            filter === 'completed' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => handleFilterChange('completed')}
        >
          <span>Completed</span>
          <span className="count bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
            {taskCounts.completed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskSidebar;