import type { Task, ApiResponse } from '../types/Task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const taskApi = {
  async getAllTasks(): Promise<ApiResponse<Task[]>> {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<ApiResponse<Task>> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return response.json();
  },

  async deleteTask(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
