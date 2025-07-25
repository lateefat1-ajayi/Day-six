import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Middleware
// 
app.use(cors({
	origin: [
		"http://localhost:5173"
	],
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionSuccessStatus: 200,
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Connect to DB and Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
});
