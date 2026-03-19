import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Types
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// In-memory storage
let tasks: Task[] = [];
let currentId = 1;

// GET /tasks - получить все задачи
app.get('/tasks', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: tasks,
    message: 'Tasks retrieved successfully',
  });
});

// GET /tasks/:id - получить задачу по ID
app.get('/tasks/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  res.status(200).json({
    success: true,
    data: task,
    message: 'Task retrieved successfully',
  });
});

// POST /tasks - создать новую задачу
app.post('/tasks', (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    });
  }

  const newTask: Task = {
    id: currentId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask,
    message: 'Task created successfully',
  });
});

// PUT /tasks/:id - обновить задачу
app.put('/tasks/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
  };

  res.status(200).json({
    success: true,
    data: tasks[taskIndex],
    message: 'Task updated successfully',
  });
});

// DELETE /tasks/:id - удалить задачу
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? parseInt(idParam[0]) : parseInt(idParam);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  tasks = tasks.filter((t) => t.id !== id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
