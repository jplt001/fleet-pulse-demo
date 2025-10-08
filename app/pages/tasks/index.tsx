import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskSidebar from '../../components/tasks/TaskSidebar';
import TaskList from '../../components/tasks/TaskList';
import TaskDetail from '../../components/tasks/TaskDetail';
import AddTaskButton from '../../components/tasks/AddTaskButton';
import AddTaskModal from '../../components/tasks/AddTaskModal';
import { fetchTasks } from '../../store/slices/taskSlice';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch tasks when component mounts
    dispatch(fetchTasks());
  }, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="tasks-page p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Fleet Tasks</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <TaskSidebar />
          </div>
          
          {/* Center Panel */}
          <div className="lg:w-2/4">
            <TaskList />
          </div>
          
          {/* Right Panel */}
          <div className="lg:w-1/4">
            <TaskDetail />
          </div>
        </div>
        
        {/* Floating Action Button */}
        <AddTaskButton onClick={openModal} />
        
        {/* Add Task Modal */}
        <AddTaskModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default TasksPage;