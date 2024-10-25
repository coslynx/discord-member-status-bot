import { createPool } from 'mysql2';
import { databaseConfig } from '../config/database.config';
import { logger } from './logger';
import { errorHandler } from './errorHandler';

let pool: any = null;

export const connectToDatabase = async (): Promise<any> => {
  try {
    pool = createPool(databaseConfig);
    logger.info('Connected to the database!');
    return pool;
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    errorHandler(error);
    return null;
  }
};

export const executeQuery = async (sql: string, values: any[] = []): Promise<any> => {
  try {
    if (!pool) {
      await connectToDatabase();
    }
    const [rows] = await pool.execute(sql, values);
    return rows;
  } catch (error) {
    logger.error('Error executing query:', error);
    errorHandler(error);
    return null;
  }
};

export const closeDatabase = async () => {
  try {
    if (pool) {
      await pool.end();
      logger.info('Database connection closed.');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error);
    errorHandler(error);
  }
};