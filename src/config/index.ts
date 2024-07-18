import dotenv from 'dotenv';
import { DBConfig, CorsConfig } from '../interfaces/config/config';

dotenv.config();

const dbConfig: DBConfig = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  isDebugEnabled: process.env.DB_DEBUG === 'true',
};

const corsConfig: CorsConfig = {
  origin: [process.env.CORS_ORIGIN] as any,
  credentials: true,
};

export { dbConfig, corsConfig };
