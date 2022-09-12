"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: [
      './build/database/migrations/**.js',
    ],
    entities: [
      './build/app/domains/*/entities/**.js',
    ],
    logging: false,
    cli: {
      migrationsDir: './build/database/migrations',
    },
  };
