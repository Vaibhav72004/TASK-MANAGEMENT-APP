import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task_app',
  dbName: process.env.DB_NAME || 'task_app',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
};
