

import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import formRoutes from './routes/formRoute.js';
import authRoutes from './routes/authRoute.js';
import eventRoutes from './routes/eventRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();


// Define __dirname for ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Database configuration
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Serve static files from the 'uploads' directory
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/form', formRoutes);
app.use('/api/v1/event', eventRoutes);


// Test API endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ecommerce app</h1>');
});



const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
