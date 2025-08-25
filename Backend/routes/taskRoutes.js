import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus 
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();



router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .patch(protect, updateTaskStatus)
  .delete(protect, deleteTask);

export default router;
