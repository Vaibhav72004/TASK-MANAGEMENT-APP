import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import mongoose from 'mongoose';

const app = express();


app.use(cors({ origin: config.clientOrigin, credentials: false }));
app.use(express.json());


app.get("/" , (req , res) =>{
  res.send("This is the Home '/'  Route and api is working Fine")
})
app.get('/api/health', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
 
  console.error('Global error:', err);
  const status = err.status || 500;
  return res.status(status).json({ message: err.message || 'Internal Server Error' });
});

// Start server after DB connect
async function start() {
  try {
    await mongoose.connect(config.mongoUri, { dbName: config.dbName });
    console.log('MongoDB connected');
    app.listen(config.port, () => {
      
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
