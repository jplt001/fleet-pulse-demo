import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import { selectTask } from '../../store/slices/taskSlice';
import type { RootState } from '../../store';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter || task.type === filter;
  });

  const handleTaskClick = (id: string) => {
    dispatch(selectTask(id));
  };

  return (
    <div className="task-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          type={task.type}
          status={task.status}
          vehicle={task.vehicle}
          driver={task.driver}
          dueDate={task.dueDate}
          priority={task.priority}
          onClick={handleTaskClick}
        />
      ))}
      
      {filteredTasks.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or create a new task.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;