import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define TypeScript interfaces
export interface Task {
  id: string;
  title: string;
  type: 'trip' | 'maintenance' | 'inspection';
  status: 'active' | 'completed' | 'pending';
  vehicle: string;
  driver: string;
  dueDate: string;
  description?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  selectedTask: Task | null;
  filter: 'all' | 'active' | 'maintenance' | 'completed';
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  selectedTask: null,
  filter: 'all',
};

// Async thunks for API calls (mock implementations)
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    return Promise.resolve(mockTasks);
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask: Omit<Task, 'id'>) => {
    // In a real app, this would be an API call
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
    };
    return Promise.resolve(task);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (updatedTask: Task) => {
    // In a real app, this would be an API call
    return Promise.resolve(updatedTask);
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    // In a real app, this would be an API call
    return Promise.resolve(taskId);
  }
);

// Create the slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedTask = null;
      } else {
        const task = state.tasks.find(task => task.id === action.payload);
        if (task) {
          state.selectedTask = task;
        }
      }
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        // Also update selected task if it's the same one
        if (state.selectedTask && state.selectedTask.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        if (state.selectedTask && state.selectedTask.id === action.payload) {
          state.selectedTask = null;
        }
      });
  },
});

// Export actions
export const { selectTask, setFilter } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;

// Mock data for initial state
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Oil Change',
    type: 'maintenance',
    status: 'pending',
    vehicle: 'Truck #123',
    driver: 'John Smith',
    dueDate: '2023-06-15',
    description: 'Regular oil change and filter replacement',
    priority: 'normal'
  },
  {
    id: '2',
    title: 'Delivery to Downtown',
    type: 'trip',
    status: 'active',
    vehicle: 'Van #456',
    driver: 'Sarah Johnson',
    dueDate: '2023-06-10',
    description: 'Deliver packages to downtown office',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Brake Inspection',
    type: 'inspection',
    status: 'completed',
    vehicle: 'Truck #789',
    driver: 'Mike Davis',
    dueDate: '2023-06-05',
    description: 'Check brake pads and fluid levels',
    priority: 'low'
  },
  {
    id: '4',
    title: 'Tire Replacement',
    type: 'maintenance',
    status: 'pending',
    vehicle: 'Van #456',
    driver: 'Sarah Johnson',
    dueDate: '2023-06-20',
    description: 'Replace front tires',
    priority: 'urgent'
  },
];