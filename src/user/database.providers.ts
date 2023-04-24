/*
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  MongooseModule.forRoot('mongodb://localhost:27017/my-database', {
    connectionFactory: (connection: mongoose.Connection) => {
      connection.on('connected', () => {
        console.log('Connected to database');
      });

      connection.on('error', (err) => {
        console.error(`Database connection error: ${err}`);
      });

      connection.on('disconnected', () => {
        console.log('Database connection closed');
      });

      return connection;
    },
  }),
];
*/
