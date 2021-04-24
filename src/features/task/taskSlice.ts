import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface TaskState {
  idCount: number;
  tasks: { id: number; title: string; completed: boolean }[];
  selectedTask: { id: number; title: string; completed: boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    deleteTask: (state, action) => {
      const newTask = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = newTask;
    },
    checkTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
      }
    },
  },
});

export const {
  createTask,
  deleteTask,
  handleModalOpen,
  editTask,
  selectTask,
  checkTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectSeletedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export default taskSlice.reducer;
