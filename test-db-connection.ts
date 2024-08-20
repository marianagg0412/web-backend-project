// import { DataSource } from 'typeorm';
// import * as dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Define your TypeORM connection options using environment variables
// const dataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST, // Use environment variable
//   port: Number(process.env.DB_PORT), // Convert string to number
//   username: process.env.DB_USER, // Use environment variable
//   password: process.env.DB_PASSWORD, // Use environment variable
//   database: process.env.DB_NAME, // Use environment variable
//   synchronize: false, // Avoid schema synchronization for this test
//   logging: false, // Disable logging
//   entities: [],
// });

// async function testConnection() {
//   try {
//     await dataSource.initialize();
//     console.log('Database connection successful!');
//   } catch (error) {
//     console.error('Database connection failed:', error);
//   } finally {
//     await dataSource.destroy();
//   }
// }

// testConnection();
